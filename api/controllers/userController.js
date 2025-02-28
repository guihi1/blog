import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth.js';
import * as userService from '../services/userService.js';

const getUsers = async (req, res) => {
	try {
		const users = await userService.getUsers();
		res.json(users);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getUserById = async (req, res) => {
	const { userId } = req.params;

	try {
		const user = await userService.getUserById(userId);
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
		const token = generateToken(user);
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

		const token = generateToken(user);
		res.status(201).json({ token });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateUserRole = async (req, res) => {
	const { id } = req.params;
	const { role } = req.body;

	if (!['USER', 'AUTHOR', 'ADMIN'].includes(role))
		return res.status(400).json({ message: 'Invalid role' });

	const user = await prisma.user.update({ where: { id }, data: { role } });
	res.json({ message: `User role updated to ${role}`, user });
};

const deleteUser = async (req, res) => {
	res.json({ message: 'DELETE /users/:userId' });
};

export {
	getUsers,
	getUserById,
	registerUser,
	updateUserRole,
	deleteUser,
	loginUser,
};
