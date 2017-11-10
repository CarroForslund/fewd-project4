const searchbox = document.getElementById('searchbox');
const main = document.querySelector('main');
const imageLinks = document.querySelectorAll('a');
const images = []; //organized image array

/* NEW CLEAN ARRAY OF IMAGES
** Clean up imageLinks and save to new array called images
*/
function organizeImageList () {

  for (let i = 0; i < imageLinks.length; i++){
    //Get every image's information
    const imgSrc = imageLinks[i].querySelector('img').src.slice(-13);;
    const imgTitle = imageLinks[i].querySelector('img').title;
    const imgCaption = imageLinks[i].getAttribute('data-caption');

    //Create an image object
    const image = {
      src: imgSrc,
      title: imgTitle,
      caption: imgCaption
    };
    //Add image to the new array images
    images.push(image);
  };
};

//Add functionality to search field
searchbox.addEventListener('keypress', function (e) {
  const input = document.querySelector('input');
  const value = input.value;
  var key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    input.value = '';
    searchImages(value);
  };
});

searchbox.onkeyup = function(){
  const input = document.querySelector('input');
  const value = input.value;
  searchImages(value);
};

/* SEARCH FOR IMAGES
** Use input from the search box to find matching image names or captions
** Show result if there is at least one match, or return message if there isn't
*/
function searchImages(input){

  input = input.toLowerCase();

  //Will store matching images if found
  let searchResult = [];

  //Search through images (no matter of upper or lowercase)
  //If the search input matches the title or caption of an image, add image to search result
  for (let i = 0; i < images.length; i++){
    if (images[i].title.toLowerCase().includes(input) || images[i].caption.toLowerCase().includes(input)){

      searchResult.push(images[i]);

    };
  };

  clearGallery();

  //Display search result if any match
  for (let i = 0; i < searchResult.length; i++){

    const imageLink = document.createElement('a');
    imageLink.href = searchResult[i].src;
    imageLink.setAttribute('data-fancybox', 'gallery');
    imageLink.setAttribute('data-caption', searchResult[i].caption);

    const img = document.createElement('img');
    img.src = searchResult[i].src;
    img.alt = searchResult[i].title;
    img.title = searchResult[i].title;;

    imageLink.appendChild(img);
    main.appendChild(imageLink);
  };

};

// CLEAR GALLERY
function clearGallery(){
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
};

//Functions to run onload
organizeImageList();
