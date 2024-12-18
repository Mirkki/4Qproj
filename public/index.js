// Array of images for the slideshow
const images = [
    'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/841ee1db-2051-4b00-a05d-a3043081e7b3.image.png?v=1734538008708', // Replace these with your actual image URLs
    'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/ad4ab807-2bf8-4ebb-969c-7fa8e1d7ac05.image.png?v=1734538025413',
    'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/24fa89a2-eab2-49af-b772-7fbea82655b9.image.png?v=1734537931236',
    'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/thumbnails%2F7e317001-e326-4293-8fd0-799187eb085e.image.png?1734538055796'
];

let index = 0; // Start with the first image
const slideshow = document.querySelector('.slideshow');

// Function to change the background
function changeBackground() {
    slideshow.style.backgroundImage = `
        linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
        url(${images[index]})
    `;
    index = (index + 1) % images.length; // Loop to the first image after the last
}

// Set interval to change the background every 5 seconds
setInterval(changeBackground, 5000);

// Initialize the first background
changeBackground();  
