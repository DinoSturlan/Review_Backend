const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Post = require('../models/Post');


router.post('/create', authMiddleware, async (req, res) => {

    try {
      const { description, image, type, category } = req.body;
  
      const newPost = new Post({
        username: req.user.username,
        description,
        image,
        type,
        date: new Date(),
        category,
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
      let categories = req.query.categories;
  
      if (Array.isArray(categories)) {
      } else if (categories && typeof categories === 'string') {

        categories = categories.split(',');
      } else {
        categories = [];
      }
  
      let query = {};
      if (categories.length && categories[0] !== 'all') {
        query = { category: { $in: categories } };
      }
  
      const posts = await Post.find(query).sort({ date: -1 });
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


  router.post('/:postId/comment/:commentId/like', authMiddleware, async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const comment = post.comments.id(req.params.commentId);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  

      if (comment.likedBy.includes(req.user.username)) {
        return res.status(400).json({ message: 'You have already liked this comment' });
      }
  

      comment.likes += 1;
      comment.likedBy.push(req.user.username);
  
      await post.save();

      res.status(200).json({ message: 'Comment liked successfully', likes: comment.likes });
    } catch (error) {
      res.status(500).json({ error: 'Error liking comment' });
    }
  });
  

  router.delete('/:postId', authMiddleware, async (req, res) => {
    try {

      const post = await Post.findById(req.params.postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  

      if (post.username !== req.user.username) {
        return res.status(403).json({ message: 'You do not have permission to delete this post' });
      }
  
      await Post.findByIdAndDelete(req.params.postId);
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  });


  module.exports = router;

