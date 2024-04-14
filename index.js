// Define an asynchronous function to initialize the application
async function initialize() {
    try {
        // Fetch data from the 'Restaurants' and 'Galleries' endpoints concurrently
        const [restaurantsResponse, galleriesResponse] = await Promise.all([
            fetch('http://localhost:3000/Restaurants'),
            fetch('http://localhost:3000/Galleries')
        ]);
        // Parse the fetched JSON data
        const restaurantsData = await restaurantsResponse.json();
        const galleriesData = await galleriesResponse.json();

        // Render the fetched data into the respective containers on the webpage
        renderItems(restaurantsData, '.restaurants-container');
        renderItems(galleriesData, '.galleries-container');
    } catch (error) {
        // Log any fetch errors to the console
        console.error('Fetch error:', error);
    }
}

// Function to render items into HTML elements and add event listeners
function renderItems(items, containerSelector) {
    // Get the container element based on the selector
    const container = document.querySelector(containerSelector);
    // Clear any previous content in the container
    container.innerHTML = '';

    // Iterate over each item and render it as a card
    items.forEach(item => {
        const card = document.createElement('div');
        // Set the class of the card based on the item's aesthetic
        card.className = `card ${item.hasOwnProperty('aesthetic') ? item.aesthetic.toLowerCase() : ''}`;
        // Populate the card's HTML content with data from the item
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name} Image">
            <div>
                <h2>${item.name}</h2>
                <h3>${item.aesthetic}</h3>
                <h4>${item.location}</h4>
                <p class="save-counter">Saves: 0</p>
            </div>
        `;
        // Append the card to the container
        container.appendChild(card);

        // Add event listeners for user interactions with the card
        let buttonsAdded = false;
        let saveCounter = 0; // Counter for saves

        card.addEventListener('mouseover', () => {
            // Check if buttons are already added to the card
            if (!buttonsAdded) {
                // Add buttons to the card for saving and removing items
                card.innerHTML += `
                <div class="container">
                    <div>
                        <button class="card" id="save">Double Click to save</button>
                    </div>
                    <div>
                        <button class="card" id="remove">Remove</button>
                    </div>
                </div>
                `;
                // Set buttonsAdded flag to true to avoid adding buttons multiple times
                buttonsAdded = true;
            }

            // Get the save button and add event listener for double click
            const saveButton = card.querySelector('#save');
            saveButton.addEventListener('dblclick', function (e) {
                // Change button appearance and update save counter on double click
                e.target.style.backgroundColor = 'green';
                e.target.innerText = 'Saved!';
                saveCounter++; // Increment save counter
                const newSaveCounter = parseInt(saveCounter) + 1;
                const saveCounterElement = card.querySelector('.save-counter');
                saveCounterElement.textContent = `Saves: ${newSaveCounter}`; // Update save counter display
            });

            // Get all buttons with id 'remove' and add event listener for click
            var removeButtons = document.querySelectorAll('button#remove');
            removeButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    card.remove(); // Remove the card from the container on click
                });
            });
        });
    });
}

// Trigger the form to scroll into view when the 'Add a new location' button is clicked
document.querySelector('#location-adder').addEventListener('click', loadForm);

// Function to scroll the form into view smoothly
function loadForm() {
    const form = document.querySelector('form');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Event listener for form submission
document.getElementById('location-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const newName = document.getElementById('name').value;
    const newLocation = document.getElementById('location').value;
    const newAesthetic = document.getElementById('aesthetic-choose').value;
    const newTime = document.getElementById('time').value;
    const newEnvt = document.getElementById('environment').value;
    const newParking = document.getElementById('parking').value;
    const newActivity = document.getElementById('activity').value;
    const newRestriction = document.getElementById('restriction').value;
    const newImage = document.getElementById('image').value;

    // Construct the endpoint URL based on the selected aesthetic
    const endpoint = newAesthetic === 'restaurants' ? 'http://localhost:3000/Galleries' : 'http://localhost:3000/Restaurants';

    // Send a POST request to the server with form data
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

    // Handle the response if needed
});

// Call the initialize function to start the application
initialize();






