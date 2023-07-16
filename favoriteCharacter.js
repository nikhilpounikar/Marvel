let favoriteCharacters = localStorage.getItem('favoriteCharacters');
// Parse the existing data as JSON (if any)
let parsedData = favoriteCharacters ? JSON.parse(favoriteCharacters) : [];
manipulatedDOMForCharactersNew(parsedData);

function manipulatedDOMForCharactersNew(charactersArray) {

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

    // Create remove from favorite element
    const removeFromFavorite = document.createElement('div');
    removeFromFavorite.className = 'add-to-favourite';
    removeFromFavorite.setAttribute('data-tooltip', 'Remove');

    // Create button element for removing from favorite
    const favoriteRemoveButton = document.createElement('button');
    favoriteRemoveButton.id = character.id;

    // add remove class css property
    favoriteRemoveButton.className = 'remove-btn';

    // add event listner to remove that character from favorite list
    favoriteRemoveButton.addEventListener('click', function () {
      removeFromLocalStorage(character.id);
    });

    // Create heart icon element
    const removeIcon = document.createElement('i');
    removeIcon.className = 'fa fa-remove';
   
    // Append the heart icon to the favorite button
    favoriteRemoveButton.appendChild(removeIcon);

    // Append the favorite button to the add to favorite element
    removeFromFavorite.appendChild(favoriteRemoveButton);

    // Append the character name and add to favorite elements to the card info
    cardInfo.appendChild(characterName);
    cardInfo.appendChild(removeFromFavorite);

    // Append the card image and card info to the card
    card.appendChild(cardImage);
    card.appendChild(cardInfo);
    mainContainer.appendChild(card);


  }

}

function removeFromLocalStorage(characterId) {

  // Retrieve existing data from local storage
  let existingData = localStorage.getItem('favoriteCharacters');

  // Parse the existing data as JSON
  let parsedData = existingData ? JSON.parse(existingData) : [];

  // Find the index of the character with the specified ID
  const index = parsedData.findIndex(character => character.id === characterId);
  console.log(index);
  // If the character is found, remove it from the array
  if (index !== -1) {
    parsedData.splice(index, 1);

    // Update the data in local storage
    localStorage.setItem('favoriteCharacters', JSON.stringify(parsedData));
  }

  // reload the page to refresh the DOM
  location.reload();
}


