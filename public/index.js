const images = [
  'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/841ee1db-2051-4b00-a05d-a3043081e7b3.image.png?v=1734538008708',
  '',
  '',
  '',
  
];

let index = 0; // Start with the first image
const slideshow = document.querySelector('.slideshow');

function changeBackground() {
  // Update the background with a gradient
  slideshow.style.backgroundImage = `
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
    url("${images[index]}")
  `;
  index = (index + 1) % images.length; // Loop to the first image after the last
}

changeBackground(); // Set the first image
setInterval(changeBackground, 5000); // Change every 5 seconds