const getComments = async (req, res) => {
  res.json({ message: 'GET /comments' });
};

const getCommentById = async (req, res) => {
  res.json({ message: 'GET /comments/:commentId' });
};

const createComment = async (req, res) => {
  res.json({ message: 'POST /comments' });
};

const updateComment = async (req, res) => {
  res.json({ message: 'PUT /comments/:commentId' });
};

const deleteComment = async (req, res) => {
  res.json({ message: 'DELETE /comments/:commentId' });
};

export {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
