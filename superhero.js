

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

    // using AJAX to fetch marvel characters
    $.ajax({
        url: ' https://gateway.marvel.com/v1/public/characters/' + characterId + '?apikey=' + publicKey + '&ts=' + timestamp + '&hash=' + hashedKey,
        method: 'GET',
        success: function (response) {

            // if code is success
            if (response.code == 200) {
                manipulatedDOMForCharacter(response.data.results[0]);
            }

        },
        error: function (error) {
            console.log('Error:', error);
        }
    });

}

function manipulatedDOMForCharacter(character) {

    console.log(character);
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
    descriptionPara.textContent = character.description;
    manageStories(character.stories);
    manageEvents(character.events);
    manageSeries(character.series);
    manageComics(character.comics);

}


function manageStories(stories) {
    let storiesId = document.getElementById('stories');
    let storiesList = document.querySelector('#stories ul');

    for (let story of stories.items) {

        // Create a list item element for each story
        const storyLi = document.createElement('li');

        storyLi.textContent = story.name;
        storiesList.appendChild(storyLi);
        storiesId.classList.remove('disable');
    }
}


function manageEvents(events) {
    let eventsId = document.getElementById('events');
    let eventsList = document.querySelector('#events ul');

    for (let event of events.items) {

        // Create a list item element for each event
        const eventLi = document.createElement('li');

        eventLi.textContent = event.name;
        eventsList.appendChild(eventLi);
        eventsId.classList.remove('disable');
    }
}

function manageSeries(series) {
    let seriesId = document.getElementById('series');
    let seriesList = document.querySelector('#series ul');

    for (let chapter of series.items) {

        // Create a list item element for each series
        const seriesLi = document.createElement('li');

        seriesLi.textContent = chapter.name;
        seriesList.appendChild(seriesLi);
        seriesId.classList.remove('disable');
    }
}

function manageComics(comics) {
    let comicsId = document.getElementById('comics');
    let comicsList = document.querySelector('#comics ul');

    for (let chapter of comics.items) {

        // Create a list item element for each comics
        const comicsLi = document.createElement('li');

        comicsLi.textContent = chapter.name;
        comicsList.appendChild(comicsLi);
        comicsId.classList.remove('disable');
    }
}

// to get hased key for marvel API
function getHashedParam(timestamp) {
    var hash = CryptoJS.MD5(timestamp + privateKey + publicKey);
    return hash.toString();

}
