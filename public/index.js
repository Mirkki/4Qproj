const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware

// JavaScript to toggle sidebar
const sidebar = document.getElementById("sidebar");
const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");

sidebarToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


let slideIndex = 0;
showSlides();

// Function to move to the next or previous slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to display the current slide
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");

    // Reset slide index if out of bounds
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Display the current slide
    slides[slideIndex].style.display = "block";
}

// Automatically change slides every 5 seconds
setInterval(() => {
    plusSlides(1);
}, 5000);