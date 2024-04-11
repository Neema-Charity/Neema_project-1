
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
            </div>
        `;
        container.appendChild(card);
    });
}

/* document.getElementById('aesthetic-choose').addEventListener('change', async function() {
    const selectedOption = this.value;
    if (selectedOption === 'restaurant') {
        const restaurantsResponse = await fetch('http://localhost:3000/Restaurants');
        const restaurantsData = await restaurantsResponse.json();
        renderItems(restaurantsData, '.restaurants-container');
    } else if (selectedOption === 'art-galleries') {
        const galleriesResponse = await fetch('http://localhost:3000/Galleries');
        const galleriesData = await galleriesResponse.json();
        renderItems(galleriesData, '.galleries-container');
    }
}); */
document.getElementById('aesthetic-choose').addEventListener('change', async function() {
    const selectedOption = this.value;
    const galleriesContainer = document.querySelector('.galleries-container');
    const restaurantsContainer = document.querySelector('.restaurants-container');
    
    if (selectedOption === 'restaurant') {
        const restaurantsResponse = await fetch('http://localhost:3000/Restaurants');
        const restaurantsData = await restaurantsResponse.json();
        renderItems(restaurantsData, '.restaurants-container');
    } else if (selectedOption === 'art-galleries') {
        const galleriesResponse = await fetch('http://localhost:3000/Galleries');
        const galleriesData = await galleriesResponse.json();
        renderItems(galleriesData, '.galleries-container');
        
        // Insert the galleries container before the restaurants container in the DOM
        restaurantsContainer.parentNode.insertBefore(galleriesContainer, restaurantsContainer);
    }
});








initialize();
