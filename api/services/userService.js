import prisma from '../prisma/db.js';

async function getUsers(req, res) {
	const users = await prisma.user.findMany();
	return users;
}

async function createUser(email, password, username) {
	const user = await prisma.user.create({
		data: {
			email,
			password,
			username,
		},
	});
	return user;
}

async function getUserByEmail(email) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
}

async function updateUserRole(userId, role) {
	const user = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			role,
		},
	});
	return user;
}

async function getUserById(userId) {
	const user = await prisma.user.findUnique({
		where: {
			id: Number.parseInt(userId),
		},
	});
	return user;
}

export { getUsers, createUser, getUserByEmail, updateUserRole, getUserById };
