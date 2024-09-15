const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Post = require('../models/Post');


router.post('/create', authMiddleware, async (req, res) => {

    try {
      const { description, image, type } = req.body;
  
      const newPost = new Post({
        username: req.user.username,
        description,
        image,
        type,
        date: new Date(),
      });
  
      await newPost.save();

      res.status(201).json({ message: 'Post created successfully', post: newPost });

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Error creating post' });
    }
  });
  
  

  router.get('/', async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  });
  
  


  router.post('/:postId/comment', authMiddleware, async (req, res) => {
    try {
      const { comment } = req.body;
      const username = req.user.username;
      const post = await Post.findById(req.params.postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.comments.push({ username, comment });
      await post.save();
  
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding comment' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  module.exports = router;

