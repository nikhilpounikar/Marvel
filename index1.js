//$('#mainContainer').hide();

// API credentials
const publicKey = '4702f56dbcc45349d61a76d91edf52bb';
const privateKey = 'e4c30e534f5c1a57acca17e1bf283898c84faa89';

$(document).ready(function () {

    fetchMarvelCharacters();
})


function fetchMarvelCharacters(characterName) {
    const timestamp = Date.now().toString();
    let hashedKey = getHashedParam(timestamp);
    let fetchUrl = 'https://gateway.marvel.com/v1/public/characters?apikey=' + publicKey + '&ts=' + timestamp + '&hash=' + hashedKey;

    // decide if all characters to fetched of purticular character to be fectched from characterName
    if (characterName != undefined) {
        fetchUrl += '&nameStartsWith=' + characterName;
    }


    // using AJAX to fetch marvel characters
    $.ajax({
        url: fetchUrl,
        method: 'GET',
        success: function (response) {

            // if code is success
            if (response.code == 200) {
                console.log(response);
                manipulatedDOMForCharacters(response.data.results);
            }

        },
        error: function (error) {
            console.log('Error:', error);
        }
    });

}

function manipulatedDOMForCharacters(charactersArray) {

    // getting the card html from document for adding characters card dynamically
    let mainContainer = document.getElementById('mainContainer');

    //iterate over character array
    for (let character of charactersArray) {


        // Create a card element
        const card = document.createElement('div');
        card.className = 'card';

        // Create card image element
        const cardImage = document.createElement('div');
        cardImage.className = 'card-image';

        // Create anchor element for the image
        const imageLink = document.createElement('a');
        imageLink.href = '/superhero.html?characterId=' + character.id;

        // Create image element
        const image = document.createElement('img');
        image.id = character.id;
        image.src = character.thumbnail.path + '.' + character.thumbnail.extension;;
        image.alt = '';

        // Append the image to the anchor element
        imageLink.appendChild(image);

        // Append the anchor element to the card image
        cardImage.appendChild(imageLink);

        // Create card info element
        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';

        // Create character name element
        const characterName = document.createElement('div');
        characterName.className = 'character-name';

        // Create span element for the character name
        const nameSpan = document.createElement('span');
        nameSpan.textContent = character.name;
        // Append the span to the character name element
        characterName.appendChild(nameSpan);

        // Create add to favorite element
        const addToFavorite = document.createElement('div');
        addToFavorite.className = 'add-to-favourite';
        addToFavorite.setAttribute('data-tooltip', 'Add to Favorites');

        // Create button element for adding to favorite
        const favoriteButton = document.createElement('button');
        favoriteButton.id = character.id;
        favoriteButton.className = 'fav-character-btn';
        favoriteButton.addEventListener('click', function () {
            addToLocalStorage(character);
        });

        // Create heart icon element
        const heartIcon = document.createElement('i');
        heartIcon.className = 'fas fa-heart';

        // Append the heart icon to the favorite button
        favoriteButton.appendChild(heartIcon);

        // Append the favorite button to the add to favorite element
        addToFavorite.appendChild(favoriteButton);

        // Append the character name and add to favorite elements to the card info
        cardInfo.appendChild(characterName);
        cardInfo.appendChild(addToFavorite);

        // Append the card image and card info to the card
        card.appendChild(cardImage);
        card.appendChild(cardInfo);
        mainContainer.appendChild(card);


    }

}

 // to get hased key for marvel API
 function getHashedParam(timestamp) {
    var hash = CryptoJS.MD5(timestamp + privateKey + publicKey);
    return hash.toString();

}

function addToLocalStorage(character) {
    // Retrieve existing data from local storage (if any)
    let existingData = localStorage.getItem('favoriteCharacters');

    // Parse the existing data as JSON (if any)
    let parsedData = existingData ? JSON.parse(existingData) : [];

    // Check if the character already exists in the data
    const existingCharacter = parsedData.find(c => c.id === character.id);

    if (!existingCharacter) {
        // Add the new character to the existing data
        parsedData.push(character);

        // Store the updated data in local storage
        localStorage.setItem('favoriteCharacters', JSON.stringify(parsedData));
    }
}

// function to manage what character by name to be fetched
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim().toLowerCase();
    fetchMarvelCharacters(searchQuery);
}

document.getElementById('searchButton').addEventListener('click', handleSearch);
