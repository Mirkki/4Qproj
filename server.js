// Step 1: Import Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Step 2: Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Step 3: Configure Middleware
app.use(express.static(path.resolve(__dirname, 'public'))); // Serves static files
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
app.set('view engine', 'hbs'); // Set view engine to Handlebars

// Step 4: Basic Route Setup
app.get('/', (req, res) => {
    res.render('index.hbs');
});

// Step 5: Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).send('Internal Server Error');
});

// Step 6: Start the Server
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
