const express = require('express');

const router = express.Router();
const helper = require('./helper.js');
const Post = require('./models/Post');

// Handle POST request to create a new post
router.post('/post', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Please enter something to post!' });
  }

  try {
    const newPost = await Post.create({ content });
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'An error occurred while creating the post.' });
  }
});

// Handle GET request to fetch all posts
router.get('/getPosts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
});

module.exports = router;
