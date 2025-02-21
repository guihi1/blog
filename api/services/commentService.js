import prisma from '../prisma/db.js';

async function getComments(req, res) {
	const comments = await prisma.comment.findMany();
	return comments;
}

async function getCommentById(commentId) {
	const comment = await prisma.comment.findUnique({
		where: {
			id: Number.parseInt(commentId),
		},
	});
	return comment;
}

async function createComment(content, authorId, postId) {
	const comment = await prisma.comment.create({
		data: {
			content,
			authorId,
			postId,
		},
	});

	return comment;
}

async function updateComment(commentId, content) {
	const comment = await prisma.comment.update({
		where: {
			id: Number.parseInt(commentId),
		},
		data: {
			content,
		},
	});

	return comment;
}

async function deleteComment(commentId) {
	await prisma.comment.delete({
		where: {
			id: Number.parseInt(commentId),
		},
	});
}

export {
	getComments,
	getCommentById,
	createComment,
	deleteComment,
	updateComment,
};
