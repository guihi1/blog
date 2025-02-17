import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth.js';
import * as userService from '../services/userService.js';

const getUsers = (req, res) => {
  try {
    const users = userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  try {
    const user = userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userService.createUser(email, hashedPassword, username);
    const token = generateToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = (req, res) => {
  res.json({ message: 'PUT /users/:userId' });
};

const deleteUser = (req, res) => {
  res.json({ message: 'DELETE /users/:userId' });
};

export {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
};
