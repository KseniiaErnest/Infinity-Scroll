'use strict'
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// Global variable
let photoArray = [];


// Unsplash API
const count = 30;
const apiKey = '8laaL1A41fUTj4xWH2_8XjwZwun2pVpQf7xC-W1woSM';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
imagesLoaded++;
if (imagesLoaded === totalImages) {
  loader.hidden = true;
  ready = true;
}
}

// Helper function to set attributes on DOM elements:
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links, photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  // Run function for each object in photoArray
  photoArray.forEach((photo) => {
// Create <a></a> to link to Unsplash
const item = document.createElement('a');
setAttributes(item, {
  href: photo.links.html,
  target: '_blank',
});
// Create <img> for photo
const img = document.createElement('img');
setAttributes(img, {
  src: photo.urls.regular,
  alt: photo.alt_description,
  title: photo.alt_description,
});
// Event Listner, check when each is finished loading:
img.addEventListener('load', imageLoaded)
// Put <img> inside <a></a>. then put both inside image container
item.appendChild(img);
imageContainer.appendChild(item);
  });
}

// Get photo from Unsplush API
async function getPhotos() {
  try {
const res = await fetch(apiUrl);
photoArray = await res.json();
displayPhotos();
  } catch(error) {
  }
}


// Check to see if scrolling near bottom of page, load more pictures
window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
  ready = false;
  getPhotos();
}
})

// On load
getPhotos();