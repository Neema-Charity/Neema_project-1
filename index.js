
/*function initialize(restaurantsData) {
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

 
    fetch('http://localhost:3000/Restaurants')
    .then(response => response.json())
    .then(data => {
        // Once the data is fetched, call the initialize function
        initialize(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
 



    fetch('http://localhost:3000/Galleries')
    .then(response => response.json())
    .then(data => {
        // Once the data is fetched, call the initialize function
        initialize(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

*/
function initialize(restaurantsData, galleriesData) {
    // Assuming `restaurantsData` is an array of objects containing restaurant data
    restaurantsData.forEach(restaurant => renderOneRestaurant(restaurant));
    
    // Assuming `galleriesData` is an array of objects containing gallery data
    galleriesData.forEach(gallery => renderOneGallery(gallery));
}

function renderOneRestaurant(restaurant) {
    let card = document.createElement('div'); // Change to div to stack horizontally
    card.className = 'card restaurant'; // Added restaurant class for styling
    card.innerHTML = `
        <img src="${restaurant.image}" alt="Restaurant Image">
        <div>
        <h2>${restaurant.name}</h2>
        <h3>${restaurant.aesthetic}</h3>
        <h4>${restaurant.location}</h4>
        </div>
    `;
    document.querySelector('.restaurants-container').appendChild(card); // Append to restaurants container
}

function renderOneGallery(gallery) {
    let card = document.createElement('div'); // Change to div to stack horizontally
    card.className = 'card gallery'; // Added gallery class for styling
    card.innerHTML = `
        <img src="${gallery.image}" alt="Gallery Image">
        <div>
        <h2>${gallery.name}</h2>
        <h3>${gallery.aesthetic}</h3>
        <h4>${gallery.location}</h4>
        </div>
    `;
    document.querySelector('.galleries-container').appendChild(card); // Append to galleries container
}

// Fetch restaurants data
fetch('http://localhost:3000/Restaurants')
    .then(response => response.json())
    .then(restaurantsData => {
        // Fetch galleries data
        fetch('http://localhost:3000/Galleries')
            .then(response => response.json())
            .then(galleriesData => {
                // Once both data sets are fetched, call the initialize function
                initialize(restaurantsData, galleriesData);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });


