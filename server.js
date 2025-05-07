// Step 1: Import Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const COMMENTS_FILE = path.join(__dirname, 'src', 'pages', 'comments.json');
const DATA_FILE = path.join(__dirname, 'src', 'pages', 'data.json');

// Step 2: Configure Middleware
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Step 3: Utility Functions for Data Handling
function readComments() {
    try {
        if (!fs.existsSync(COMMENTS_FILE)) {
            fs.writeFileSync(COMMENTS_FILE, JSON.stringify([]), 'utf8'); 
        }
        return JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
    } catch (error) {
        console.error('Error reading comments:', error);
        return [];
    }
}

function addComment(comment) {
    try {
        let comments = readComments();
        comment.id = Date.now();
        comments.push(comment);
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing comment:', error);
    }
}

function editComment(commentId, updatedText) {
    try {
        let comments = readComments();
        let commentIndex = comments.findIndex(c => c.id === parseInt(commentId));
        if (commentIndex !== -1) {
            comments[commentIndex].comment = updatedText;
            fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf8');
        }
    } catch (error) {
        console.error('Error editing comment:', error);
    }
}

function deleteComment(commentId) {
    try {
        let comments = readComments();
        comments = comments.filter(comment => comment.id !== parseInt(commentId));
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf8');
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

function renderComment(comment) {
    const container = document.createElement('div');
    container.innerHTML = `
      <strong>${comment.author}</strong>
      <p>${comment.content}</p>
      <div>
        ${comment.actions.map(a => `<button>${a}</button>`).join(' ')}
      </div>
    `;
    return container;
  }

function readData() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8'); 
        }
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

function addEntry(entry) {
    try {
        let data = readData();
        entry.id = Date.now();
        data.push(entry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing data:', error);
    }
}

function editEntry(entryId, updatedMessage) {
    try {
        let data = readData();
        let entryIndex = data.findIndex(e => e.id === parseInt(entryId));
        if (entryIndex !== -1) {
            data[entryIndex].message = updatedMessage;
            fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        }
    } catch (error) {
        console.error('Error editing entry:', error);
    }
}

// Step 4: Define Routes
app.get('/', (req, res) => res.render('index', { title: 'Mobile Legend Meta Heroes', images: [
    'https://i.pinimg.com/originals/bd/53/74/bd5374ccdaeefc975196f287e84b685d.jpg',
    'https://wallpapercave.com/wp/wp6682346.jpg',
    'https://i.pinimg.com/originals/5d/5b/1a/5d5b1abf58ea7ac2532cf00fe533905b.jpg',
    'https://en.esportsku.com/wp-content/uploads/2022/11/kimmy-epic.jpg',
    'https://rare-gallery.com/mocahbig/395366-miya-modena-butterfly-legend-skin-mobile-legends.jpg',
    'https://api.duniagames.co.id/api/content/upload/file/5784485791641207050.jpg',
    'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-12%2010.24.53%20PM.png?v=1734013510420',
    'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/7e317001-e326-4293-8fd0-799187eb085e.image.png?v=1734538055796',
    'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/benedetta.jpeg?v=1734540607944'
], entries: readData() }));

app.get('/about', (req, res) => res.render('about'));
app.get('/members', (req, res) => res.render('members'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/comments', (req, res) => res.render('comments', { comments: readComments() }));

app.get('/meta-heroes', (req, res) => { res.render('meta-heroes', { heroes: [ { name: "Joy", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/joy.jpeg?v=1734540340460", reason: "Duration of Burst while being CC immuned", pair: "Angela", pairImage: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/5af05aec-a8a1-4b59-9437-990684f621fc.image.png?v=1734540938084" }, { name: "Benedetta", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/benedetta.jpeg?v=1734540607944", reason: "High Burst, High Mobility, immense Anti-CC", pair: "Atlas", pairImage: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/b4f78bd5-3478-4f10-9b6d-8bf9ad2939aa.image.png?v=1734541167684" }, { name: "Helcurt", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/hc.jpeg?v=1734540673251", reason: "High Burst Damage, Strong Early Game, Global Ultimate", pair: "Floryn", pairImage: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/a2a9651d-5fb9-469f-83ea-1f86b5af69db.image.png?v=1734541210599" }, { name: "Julian", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/julian.jpeg?v=1734540743197", reason: "High Burst Damage, Sustain, Flexibility", pair: "Angela", pairImage: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/5af05aec-a8a1-4b59-9437-990684f621fc.image.png?v=1734540938084" }, { name: "Arlott", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/arlott.jpeg?v=1734540821840", reason: "Sustain, Skill Cap, Flexibility", pair: "Khufra", pairImage: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/ef40bab4-c1a9-4cf7-b42c-6332152465b1.image.png?v=1734541251822" } ] }); }); app.get('/effective-combos', (req, res) => { res.render('effective-combos', { combos: [ { hero: "Joy", combo: "Skill 1 (Dash) → Skill 2 (Beat) × 5 → Ultimate (Electrifying Beats) → Basic Attack", spell: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/82aa6ef6-2d9c-428f-a1e3-ddc494ac24c3.image.png?v=1734541491869", emblem: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/23d62b24-233c-43f6-aaf8-cf280d05758d.image.png?v=1734541691014", build: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/536a3494-7b7d-4c49-a8b7-ca7cead5c59c.image.png?v=1734541825524", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/joy.jpeg?v=1734540340460" }, { hero: "Benedetta", combo: "Passive (Elapsed Daytime Dash) → Skill 1 (Shadow Slash) → Skill 2 (An Eye for An Eye) → Ultimate (Alecto: Final Blow) → Basic Attack", spell: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/a323de90-fda7-403e-aa43-85e579b40579.image.png?v=1734542200960", emblem: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-19%201.18.22%20AM.png?v=1734542310291", build: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/36cdbfeb-de73-408a-9e3c-1c2e6e099b71.image.png?v=1734542366938", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/benedetta.jpeg?v=1734540607944" }, { hero: "Helcurt", combo: "Ultimate (Dark Night Falls) → Skill 2 (Deadly Stinger) → Skill 1 (Shadow Transition) → Basic Attack", spell: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-19%201.22.29%20AM.png?v=1734542557537", emblem: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-19%201.23.16%20AM.png?v=1734542602871", build: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-19%201.24.06%20AM.png?v=1734542652154", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/hc.jpeg?v=1734540673251" }, { hero: "Julian", combo: "Skill 1 (Scythe) → Skill 3 (Chain) → Skill 2 (Dash) → Enhanced Skill 2 (Enhanced Dash) → Basic Attack", spell: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-19%201.25.32%20AM.png?v=1734542742143", emblem: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-19%201.26.19%20AM.png?v=1734542785933", build: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/140fe18f-716a-4944-a6f3-a2d50a246995.image.png?v=1734542937821", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/julian.jpeg?v=1734540743197" }, { hero: "Arlott", combo: "Skill 2 (Vengeance) → Skill 1 (Dauntless Strike) → Ultimate (Final Slash) → Skill 2 (Vengeance) → Basic Attack", spell: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-19%201.33.13%20AM.png?v=1734543201662", emblem: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/0b91994a-2ff8-4a46-92cc-7c6731fd68a5.image.png?v=1734543087185", build: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/dee4177b-088c-4a20-bf6c-b40259a08ae1.image.png?v=1734543122195", image: "https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/arlott.jpeg?v=1734540821840" } ] }); });

// ✅ Edit Functionality Added
app.post('/submit', (req, res) => { addEntry({ name: req.body.name, message: req.body.message }); res.redirect('/'); });
app.post('/edit-entry', (req, res) => { editEntry(req.body.entryId, req.body.editedMessage); res.redirect('/'); });
app.post('/delete', (req, res) => { 
    const entryId = parseInt(req.body.entryId);

    if (!entryId) {
        return res.status(400).send('Invalid entry ID.');
    }

    let data = readData().filter(entry => entry.id !== entryId);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.redirect('/');
});




app.post('/add-comment', (req, res) => { addComment({ name: req.body.name, comment: req.body.comment }); res.redirect('/comments'); });
app.post('/edit-comment', (req, res) => { 
    const { commentId, editedComment } = req.body;
    
    if (!commentId || !editedComment) {
        return res.status(400).send('Invalid comment data.');
    }

    editComment(commentId, editedComment);
    res.redirect('/comments');
});
app.post('/delete-comment', (req, res) => { 
    const commentId = parseInt(req.body.commentId);

    if (!commentId) {
        return res.status(400).send('Invalid comment ID.');
    }

    let comments = readComments().filter(comment => comment.id !== commentId);
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf8');
    res.redirect('/comments');
});

// Step 6: Start the Server
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
