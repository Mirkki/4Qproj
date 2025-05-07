// Step 1: Import Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = './src/pages/data.json';

// Step 2: Configure Middleware
app.use(express.static(path.resolve(__dirname, 'public'))); // Serves static files
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views')); // Ensure Handlebars templates are recognized

// Step 3: Utility Functions for CRUD
function readData() {
    try {
        const rawData = fs.readFileSync(DATA_FILE);
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

function addEntry(entry) {
    try {
        let data = readData();
        data.push(entry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data:', error);
    }
}

// Step 4: Define Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Mobile Legend Meta Heroes',
        images: [
            'https://th.bing.com/th/id/R.2e0713837ed388b09d3d25654afd2c22?rik=2FWTrREsAtN7kw&riu=http%3a%2f%2fmlbb.mobacompanion.com%2fwp-content%2fuploads%2fsites%2f2%2f2020%2f01%2ffaramis_the_alchemist-scaled.jpg&ehk=tTv5gIfQY%2f%2bbRcXAauiehin%2fig7%2bCYMOmm%2bCGYO2WaI%3d&risl=&pid=ImgRaw&r=0',
            'https://oneesports.azureedge.net/cdn-data/2021/05/MLBB_Lunox.jpg',
            'https://i.pinimg.com/originals/bd/53/74/bd5374ccdaeefc975196f287e84b685d.jpg',
            'https://wallpapercave.com/wp/wp6682346.jpg',
            'https://i.pinimg.com/originals/5d/5b/1a/5d5b1abf58ea7ac2532cf00fe533905b.jpg',
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d2633b97-4158-44c7-ae9e-60deb0af8370/dfgers6-115f22be-2417-41ad-97e4-5fa2c267c737.png/v1/fill/w_1280,h_720,q_80,strp/joy___mobile_legends_bang_bang_by_mrerei_dfgers6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
            'https://en.esportsku.com/wp-content/uploads/2022/11/kimmy-epic.jpg',
            'https://rare-gallery.com/mocahbig/395366-miya-modena-butterfly-legend-skin-mobile-legends.jpg',
            'https://api.duniagames.co.id/api/content/upload/file/5784485791641207050.jpg'
        ],
        entries: readData()
    });
});

app.get('/about', (req, res) => res.render('about', { title: 'About Us' }));
app.get('/meta-heroes', (req, res) => res.render('meta-heroes', { title: 'Meta Heroes' }));
app.get('/effective-combos', (req, res) => res.render('effective-combos', { title: 'Effective Combos' }));
app.get('/members', (req, res) => res.render('members', { title: 'Members' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact Us' }));

// Step 5: Form Handling (Create Operation)
app.post('/submit', (req, res) => {
    const newEntry = {
        name: req.body.name,
        message: req.body.message
    };

    addEntry(newEntry);
    res.redirect('/');
});

// Step 6: Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).send('Internal Server Error');
});

// Step 7: Start the Server
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
