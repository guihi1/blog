import * as postService from '../services/postService.js';

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postService.getPostById(postId);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, content, authorId, published } = req.body;

  try {
    const post = await postService.createPost(
      title,
      content,
      authorId,
      published,
    );
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { postId, title, content, published } = req.body;

  try {
    const post = await postService.updatePost(
      postId,
      title,
      content,
      published,
    );
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    await postService.deletePost(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
