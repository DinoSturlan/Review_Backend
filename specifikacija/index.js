import express from 'express';
import data from './store';
import cors from 'cors';

const app = express();
const port = 3200;

app.use(cors());
app.use(express.json());

// Users
app.get('/users', (req, res) => res.json(data.users));

// Posts
app.get('/posts', (req, res) => res.json(data.posts));
app.get('/posts/:postId', (req, res) => res.json(data.jedan_post));
app.post('/posts', (req, res) => {
    res.status(201).json({
        message: 'Post stvoren',
    });
});

// Rating
app.post('/posts/:postId/rating', (req, res) => {
    res.status(201).json({
        message: 'Rating dodan',
    });
});

// Comments
app.post('/posts/:postId/comments', (req, res) => {
    res.status(201).json({
        message: 'Komentar dodan',
    });
});

// Requests
app.get('/requests', (req, res) => res.json(data.requests));
app.get('/requests/:requestId', (req, res) => res.json(data.jedan_request));

app.post('/requests', (req, res) => {
    res.status(201).json({
        message: 'Request dodan',
    });
});

app.post('/requests/:requestId/comments', (req, res) => {
    res.status(201).json({
        message: 'Komentar dodan',
    });
});



app.listen(port, () => console.log(`Slušam na ${port}`));