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


