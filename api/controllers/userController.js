const getUsers = (req, res) => {
  res.json({ message: 'GET /users' });
};

const getUserById = (req, res) => {
  res.json({ message: 'GET /users/:userId' });
};

const createUser = (req, res) => {
  res.json({ message: 'POST /users' });
};

const updateUser = (req, res) => {
  res.json({ message: 'PUT /users/:userId' });
};

const deleteUser = (req, res) => {
  res.json({ message: 'DELETE /users/:userId' });
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
