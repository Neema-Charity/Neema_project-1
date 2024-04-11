
async function initialize() {
    try {
        const [restaurantsResponse, galleriesResponse] = await Promise.all([
            fetch('http://localhost:4000/Restaurants'),
            fetch('http://localhost:4000/Galleries')
        ]);
        const restaurantsData = await restaurantsResponse.json();
        const galleriesData = await galleriesResponse.json();

        renderItems(restaurantsData, '.restaurants-container');
        renderItems(galleriesData, '.galleries-container');
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function renderItems(items, containerSelector) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = ''; // Clear previous content

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = `card ${item.hasOwnProperty('aesthetic') ? item.aesthetic.toLowerCase() : ''}`;
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name} Image">
            <div>
                <h2>${item.name}</h2>
                <h3>${item.aesthetic}</h3>
                <h4>${item.location}</h4>
            </div>
        `;
        container.appendChild(card);
    });
}

document.getElementById('aesthetic-choose').addEventListener('change', async function() {
    const selectedOption = this.value;
    const galleriesContainer = document.querySelector('.galleries-container');
    const restaurantsContainer = document.querySelector('.restaurants-container');
    if (selectedOption === 'restaurant'){
        const restaurantsResponse = await fetch('http://localhost:4000/Restaurants');
        const restaurantsData = await restaurantsResponse.json();
        renderItems(restaurantsData, '.restaurants-container');
    } else if (selectedOption === 'art-galleries') {
        const galleriesResponse = await fetch('http://localhost:4000/Galleries');
        const galleriesData = await galleriesResponse.json();
        renderItems(galleriesData, '.galleries-container');
        
        // Insert the galleries container before the restaurants container in the DOM
        restaurantsContainer.parentNode.insertBefore(galleriesContainer, restaurantsContainer);
    }
}); 
initialize();

document.querySelector('#location-adder').addEventListener('click', loadForm);

function loadForm() {
    const form = document.querySelector('form');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


document.getElementById('location-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form values
    const newName = document.getElementById('name').value;
    const newLocation = document.getElementById('location').value;
    const newAesthetic = document.getElementById('aesthetic-choose').value; // Get the selected option value
    const newTime = document.getElementById('time').value;
    const newEnvt = document.getElementById('environment').value;
    const newParking = document.getElementById('parking').value;
    const newActivity = document.getElementById('activity').value;
    const newRestriction = document.getElementById('restriction').value;
    const newImage = document.getElementById('image').value;
    
    // Construct the endpoint URL based on the selected aesthetic
    const endpoint = newAesthetic === 'restaurant' ? 'http://localhost:4000/Restaurants' : 'http://localhost:4000/Galleries';

    try {
        // Make a POST request to the appropriate endpoint
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                location: newLocation,
                aesthetic: newAesthetic,
                time: newTime,
                environment: newEnvt,
                parking: newParking,
                activity: newActivity,
                restriction: newRestriction,
                image: newImage
            })
        });

        if (response.ok) {
            console.log('Data successfully added to the server.');
        } else {
            console.error('Failed to add data to the server.');
        }
    } catch (error) {
        console.error('Error occurred while adding data:', error);
    }
});
