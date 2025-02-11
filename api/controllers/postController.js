const getPosts = async (req, res) => {
  res.json({ message: 'GET /posts' });
};

const getPostById = async (req, res) => {
  res.json({ message: 'GET /posts/:postId' });
};

const createPost = async (req, res) => {
  res.json({ message: 'POST /posts' });
};

const updatePost = async (req, res) => {
  res.json({ message: 'PUT /posts/:postId' });
};

const deletePost = async (req, res) => {
  res.json({ message: 'DELETE /posts/:postId' });
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
