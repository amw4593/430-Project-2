const models = require('../models');

const { Post } = models;

const postPage = async (req, res) => res.render('app');

// Controller function to handle creating a new post
const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Please enter something to post!' });
  }

  try {
    const newPost = await Post.create({ content });
    return res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    return res.status(500).json({ error: 'An error occurred while creating the post.' });
  }
};

// Controller function to handle fetching all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.render('posts', { posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    return res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
};

module.exports = {
  postPage,
  createPost,
  getPosts,
};
