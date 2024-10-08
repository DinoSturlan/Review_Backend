const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    type: { type: String, enum: ['review', 'request'], required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    comments: [
      {
        username: String,
        comment: String,
        date: { type: Date, default: Date.now },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: String }]
      }
    ]
  });
  
  const Post = mongoose.model('Post', postSchema);
  module.exports = Post;

