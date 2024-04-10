fetch('http://localhost:3000/Restaurants')
    .then(response => response.json())
    .then(data => {
        // Once the data is fetched, call the initialize function
        initialize(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

function initialize(restaurantsData) {
    // Assuming `restaurantsData` is an array of objects containing restaurant data
    restaurantsData.forEach(restaurant => renderOneRestaurant(restaurant));
}

function renderOneRestaurant(restaurant) {
    let card = document.createElement('ol');
    card.className = 'card';
    card.innerHTML = `
        <img src="${restaurant.image}" alt="Restaurant Image">
        <div>
        <h2>${restaurant.name}</h2>
        <h3>${restaurant.aesthetic}</h3>
        <h4>${restaurant.location}</h4>
        </div>
    `;
    document.querySelector('body').appendChild(card);
} 





