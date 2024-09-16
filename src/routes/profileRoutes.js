const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/stats', authMiddleware, async (req, res) => {
    try {
      const username = req.user.username;
  
      const postCount = await Post.countDocuments({ username: username });
  
      const commentCount = await Post.aggregate([
        { $unwind: '$comments' },
        { $match: { 'comments.username': username } },
        { $count: 'totalComments' }
      ]);
  
      const commentCountValue = commentCount[0] ? commentCount[0].totalComments : 0;
  
      res.status(200).json({
        posts: postCount,
        comments: commentCountValue,
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;

