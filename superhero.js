

// API credentials
const publicKey = '4702f56dbcc45349d61a76d91edf52bb';
const privateKey = 'e4c30e534f5c1a57acca17e1bf283898c84faa89';

// Get the current URL
const url = new URL(window.location.href);
// Get the search parameters from the URL
const searchParams = new URLSearchParams(url.search);

// Get the value of the "characterId" parameter
const characterId = searchParams.get('characterId');

fetchMarvelCharacterById(characterId);


function fetchMarvelCharacterById(characterId) {
    const timestamp = Date.now().toString();
    let hashedKey = getHashedParam(timestamp);

    let fetchUrl = 'https://gateway.marvel.com/v1/public/characters/' + characterId + '?apikey=' + publicKey + '&ts=' + timestamp + '&hash=' + hashedKey;
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fetchUrl, true);

    // Set the success callback function
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            // If code is success
            if (response.code == 200) {
                manipulatedDOMForCharacter(response.data.results[0]);
            }

        }
    };

    // Set the error callback function
    xhr.onerror = function () {
        console.log('Error:', xhr.statusText);
    };

    // Send the request
    xhr.send();

}


function manipulatedDOMForCharacter(character) {

    // getting the card html from document for adding characters card dynamically
    let currentCard = document.getElementsByClassName('card')[0];

    // prepare the image src
    let url = character.thumbnail.path + '.' + character.thumbnail.extension;

    // lets add the image source to image tag
    let characterImg = currentCard.querySelector('.card-image img'); // Target the img tag
    characterImg.src = url; // Set the src attribute of the img tag


    let characterNameSpan = currentCard.querySelector('.card-info span');

    characterNameSpan.innerHTML = character.name;

    let favCharacterButton = currentCard.querySelector('.card-info button');

    favCharacterButton.setAttribute('id', character.id);
    let descriptionPara = document.querySelector('#description p');

    // if description of character is available then show description div
    if (character.description != undefined && character.description != "") {
        document.getElementById('description-container').classList.remove('disable');
    }
    descriptionPara.textContent = character.description;

    // adding event listener so that character can be put in favorite list
    favCharacterButton.addEventListener('click', function () {
        addToLocalStorage(character);
    });

    manageStoriesDOM(character.stories);
    manageEventsDOM(character.events);
    manageSeriesDOM(character.series);
    manageComicsDOM(character.comics);

}


function manageStoriesDOM(stories) {
    let storiesId = document.getElementById('stories');
    let storiesList = document.querySelector('#stories ul');

    for (let story of stories.items) {

        // Create a list item element for each story
        const storyLi = document.createElement('li');

        storyLi.textContent = story.name;
        storiesList.appendChild(storyLi);
        // if story avaliable show story div
        storiesId.classList.remove('disable');
    }
}


function manageEventsDOM(events) {
    let eventsId = document.getElementById('events');
    let eventsList = document.querySelector('#events ul');

    for (let event of events.items) {

        // Create a list item element for each event
        const eventLi = document.createElement('li');

        eventLi.textContent = event.name;
        eventsList.appendChild(eventLi);
        // if events are avaliable show event div
        eventsId.classList.remove('disable');
    }
}

function manageSeriesDOM(series) {
    let seriesId = document.getElementById('series');
    let seriesList = document.querySelector('#series ul');

    for (let chapter of series.items) {

        // Create a list item element for each series
        const seriesLi = document.createElement('li');

        seriesLi.textContent = chapter.name;
        seriesList.appendChild(seriesLi);
        // if series avaliable show series div
        seriesId.classList.remove('disable');
    }
}

function manageComicsDOM(comics) {
    let comicsId = document.getElementById('comics');
    let comicsList = document.querySelector('#comics ul');

    for (let chapter of comics.items) {

        // Create a list item element for each comics
        const comicsLi = document.createElement('li');

        comicsLi.textContent = chapter.name;
        comicsList.appendChild(comicsLi);
        // if comics avaliable show comics div
        comicsId.classList.remove('disable');
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

        alert(character.name+" added to favorite Character List");
        // Store the updated data in local storage
        localStorage.setItem('favoriteCharacters', JSON.stringify(parsedData));
    } else {

        alert("Already In favorite List");
    }
}