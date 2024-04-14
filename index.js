async function initialize() {
    try {
        const [restaurantsResponse, galleriesResponse] = await Promise.all([
            fetch('http://localhost:3000/Restaurants'),
            fetch('http://localhost:3000/Galleries')
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
                <p class="save-counter">Saves: 0</p>
            </div>
        `;
        container.appendChild(card);

        // Add a flag to track whether buttons are added
        let buttonsAdded = false;
        let saveCounter = 0; // Counter for saves

        card.addEventListener('mouseover', () => {
            // Check if buttons are already added
            if (!buttonsAdded) {
                card.innerHTML += `
                <div class="container">
                    <div>
                        <button class="card" id="save">Double Click to save</button>
                    </div>
                    <div>
                    <button class="card" id="remove">Remove</button>
               </div>
                `;
                // Set buttonsAdded flag to true
                buttonsAdded = true;
            }

            // Get the save button
            const saveButton = card.querySelector('#save');
            // Add event listener to save button
            saveButton.addEventListener('dblclick', function (e) {
                e.target.style.backgroundColor = 'green';
                e.target.innerText = 'Saved!';
                // Increment save counter
                saveCounter=+ 0;
                const newSaveCounter= parseInt(saveCounter) +1
                // Update save counter display
                const saveCounterElement = card.querySelector('.save-counter');
                saveCounterElement.textContent = `Saves: ${newSaveCounter}`;
            });

            // Get all buttons with id 'remove'
            var removeButtons = document.querySelectorAll('button#remove');
            removeButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    card.remove();
                });
            });
        });
    });
}

initialize();

document.querySelector('#location-adder').addEventListener('click', loadForm);

function loadForm() {
    const form = document.querySelector('form');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.getElementById('location-form').addEventListener('submit', async function (event) {
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
    const endpoint = newAesthetic === 'restaurants' ? 'http://localhost:3000/Galleries' : 'http://localhost:3000/Restaurants';

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

});





