$('#mainContainer').hide();
{
  
  $(document).ready(function () {
   
    let favoriteCharacters = localStorage.getItem('favoriteCharacters');
    // Parse the existing data as JSON (if any)
    let parsedData = favoriteCharacters ? JSON.parse(favoriteCharacters) : [];
    manipulatedDOMForCharacters(parsedData);
  })

  function manipulatedDOMForCharacters(charactersArray) {

    // getting the card html from document for adding characters card dynamically
    let card = document.getElementsByClassName('card')[0];

    //iterate over character array
    for (let character of charactersArray) {


     
      //clone the dummy card along with its childs
      let currentCard = card.cloneNode(true); // Clone the card element

      // prepare the image src
      let url = character.thumbnail.path + '.' + character.thumbnail.extension;
      let anchor = currentCard.querySelector('.card-image a');
      anchor.setAttribute('href','/superhero.html?characterId='+character.id);
      // lets add the image source to image tag
      let characterImg = currentCard.querySelector('.card-image img'); // Target the img tag
      characterImg.src = url; // Set the src attribute of the img tag
      
      // setting id as characterid in order to fetch more details about purticula character
      characterImg.setAttribute('id',character.id);
      
      let characterNameSpan = currentCard.querySelector('.card-info span');

      characterNameSpan.innerHTML  = character.name;

      let favCharacterRemoveButton = currentCard.querySelector('.card-info button');
      
      favCharacterRemoveButton.setAttribute('id', character.id);
      favCharacterRemoveButton.addEventListener('click',function(){
        
        removeFromLocalStorage(character.id);
      })

           //console.log(characterNameSpan);
      // Append the modified cloned card to the image-container
      $('#mainContainer').append(currentCard);
    }

    // hide the dummy card 
    card.style.display = 'none';
    $('#mainContainer').show();
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

    location.reload();
  }
  
  
}