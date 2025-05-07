const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const COMMENTS_FILE = path.join(__dirname, 'src', 'pages', 'comments.json');
const DATA_FILE = path.join(__dirname, 'src', 'pages', 'data.json');
const RATING_FILE = path.join(__dirname, 'src', 'pages', 'rating.json');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Utility Functions
function readRatings() {
    try {
        if (!fs.existsSync(RATING_FILE)) {
            fs.writeFileSync(RATING_FILE, JSON.stringify({ ratings: [], average: 0 }), 'utf8');
        }
        return JSON.parse(fs.readFileSync(RATING_FILE, 'utf8'));
    } catch (error) {
        console.error('Error reading ratings:', error);
        return { ratings: [], average: 0 };
    }
}

function saveRating(rating) {
    try {
        const data = readRatings();
        data.ratings.push(rating);
        
        // Calculate new average
        const sum = data.ratings.reduce((a, b) => a + b, 0);
        data.average = parseFloat((sum / data.ratings.length).toFixed(2));
        
        fs.writeFileSync(RATING_FILE, JSON.stringify(data, null, 2), 'utf8');
        return data;
    } catch (error) {
        console.error('Error saving rating:', error);
        throw error;
    }
}

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
        const comments = readComments();
        comment.id = Date.now();
        comments.push(comment);
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf8');
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

// Routes
app.post('/submit-rating', (req, res) => {
    try {
        const rating = parseInt(req.body.rating);
        
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ 
                error: 'Please provide a valid rating between 1 and 5' 
            });
        }

        const updatedData = saveRating(rating);
        res.json({ 
            success: true,
            averageRating: updatedData.average,
            totalRatings: updatedData.ratings.length
        });
    } catch (error) {
        console.error('Rating submission error:', error);
        res.status(500).json({ 
            error: 'Failed to save rating. Please try again.' 
        });
    }
});
// Comments Routes
app.get('/comments', (req, res) => {
    try {
        const comments = readComments();
        const ratings = readRatings();
        res.render('comments', { 
            comments, 
            averageRating: ratings.average || 0 
        });
    } catch (error) {
        console.error('Error loading comments page:', error);
        res.status(500).send('Error loading comments');
    }
});

app.post('/add-comment', (req, res) => {
    try {
        if (!req.body.name || !req.body.comment) {
            return res.status(400).redirect('/comments?error=Missing required fields');
        }
        
        addComment({
            name: req.body.name,
            comment: req.body.comment,
            date: new Date().toISOString()
        });
        
        res.redirect('/comments');
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).redirect('/comments?error=Failed to add comment');
    }
});

// Comments functions
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

// Data functions
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

// Routes
app.get('/', (req, res) => res.render('index', { 
    title: 'Mobile Legend Meta Heroes', 
    images: [
        'https://i.pinimg.com/originals/bd/53/74/bd5374ccdaeefc975196f287e84b685d.jpg',
        'https://wallpapercave.com/wp/wp6682346.jpg',
        'https://i.pinimg.com/originals/5d/5b/1a/5d5b1abf58ea7ac2532cf00fe533905b.jpg',
        'https://en.esportsku.com/wp-content/uploads/2022/11/kimmy-epic.jpg',
        'https://rare-gallery.com/mocahbig/395366-miya-modena-butterfly-legend-skin-mobile-legends.jpg',
        'https://api.duniagames.co.id/api/content/upload/file/5784485791641207050.jpg',
        'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/Screenshot%202024-12-12%2010.24.53%20PM.png?v=1734013510420',
        'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/7e317001-e326-4293-8fd0-799187eb085e.image.png?v=1734538055796',
        'https://cdn.glitch.global/0a76087d-70c6-4b75-ace4-c40a965aa8bb/benedetta.jpeg?v=1734540607944'
    ], 
    entries: readData() 
}));

app.get('/about', (req, res) => res.render('about'));
app.get('/members', (req, res) => res.render('members'));
app.get('/contact', (req, res) => res.render('contact'));

app.get('/comments', (req, res) => {
    const comments = readComments();
    const ratings = readRatings();
    const averageRating = calculateAverage(ratings);
    res.render('comments', { comments, averageRating });
});

// Meta heroes and combos routes (unchanged from your original)
app.get('/meta-heroes', (req, res) => { /* ... */ });
app.get('/effective-combos', (req, res) => { /* ... */ });

// Form submission routes
app.post('/submit', (req, res) => { 
    addEntry({ name: req.body.name, message: req.body.message }); 
    res.redirect('/'); 
});

app.post('/edit-entry', (req, res) => { 
    editEntry(req.body.entryId, req.body.editedMessage); 
    res.redirect('/'); 
});

app.post('/delete', (req, res) => { 
    const entryId = parseInt(req.body.entryId);
    if (!entryId) {
        return res.status(400).send('Invalid entry ID.');
    }
    let data = readData().filter(entry => entry.id !== entryId);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.redirect('/');
});

app.post('/add-comment', (req, res) => { 
    addComment({ name: req.body.name, comment: req.body.comment }); 
    res.redirect('/comments'); 
});

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Rating data will be stored in: ${RATING_FILE}`);
});