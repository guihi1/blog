import prisma from '../prisma/db.js';

async function getPosts(req, res) {
  const posts = await prisma.post.findMany();
  return posts;
}

async function getPostById(postId) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });
  return post;
}

async function createPost(title, content, authorId, published) {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      published,
    },
  });

  return post;
}

async function updatePost(postId, title, content, published) {
  const post = await prisma.post.update({
    where: {
      id: parseInt(postId),
    },
    data: {
      title,
      content,
      published,
    },
  });

  return post;
}

async function deletePost(postId) {
  await prisma.post.delete({
    where: {
      id: parseInt(postId),
    },
  });
}

export { getPosts, getPostById, createPost, updatePost, deletePost };
