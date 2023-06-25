var imageContainer = document.getElementById('image-container');

{   
     // API credentials
     const publicKey = '4702f56dbcc45349d61a76d91edf52bb';
     const privateKey = 'e4c30e534f5c1a57acca17e1bf283898c84faa89';

    $(document).ready(function () {
        console.log('Hi');

        fetchMarvelAPIData();
    })


    function fetchMarvelAPIData() {
        const timestamp = Date.now().toString();
        let hashedKey = getHashedParam(timestamp);

        $.ajax({
            url: ' https://gateway.marvel.com/v1/public/characters?apikey='+publicKey+'&ts='+timestamp+'&hash='+hashedKey,
            method: 'GET',
            success: function(response) {
              // Process the response
              console.log(response);

              if(response.code ==200){

                manipulatedDOMForCharacters(response.data.results);
              }
             
            },
            error: function(error) {
              console.log('Error:', error);
            }
          });

    }

    function fetchThumbnail(thumbnailUrl){

        $.ajax({
            url: thumbnailUrl,
            method: 'GET',
            success: function(response) {
              // Process the response
             

             
            },
            error: function(error) {
              console.log('Error:', error);
            }
        });
    }
    function manipulatedDOMForCharacters(charactersArray) {

        // getting the card html from document for adding characters card dynamically
        let card = document.getElementsByClassName('card')[0];
      
        //iterate over character array
        for (let character of charactersArray) {
          //clone the dummy card along with its childs
          let currentCard = card.cloneNode(true); // Clone the card element
          
          // prepare the image src
          let url = character.thumbnail.path + '.' + character.thumbnail.extension;
        
          // lets add the image source to image tag
          let characterImg = currentCard.querySelector('.card-image img'); // Target the img tag
          characterImg.src = url; // Set the src attribute of the img tag
        
          // Append the modified cloned card to the image-container
          $('#mainContainer').append(currentCard);
        }

        // hide the dummy card 
        card.style.display = 'none';
      }
      


    function getHashedParam(timestamp){


         // Skill Test code
        // following lines are for milestones 6 skill test 2
        //var crypto = require("crypto");

       

        
        console.log(timestamp);
        // const hash = crypto
        //     .createHash('md5')
        //     .update(timestamp + privateKey + publicKey)
        //     .digest('hex');
        var hash = CryptoJS.MD5(timestamp + privateKey + publicKey);
        console.log(hash.toString());
        return hash.toString();

    }


}