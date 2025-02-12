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

export { getUsers, createUser, getUserByEmail };
