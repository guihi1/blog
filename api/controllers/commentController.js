import * as commentService from '../services/commentService.js';

const getComments = async (req, res) => {
	try {
		const comments = await commentService.getComments();
		res.json(comments);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const createComment = async (req, res) => {
	const { content, authorId, postId } = req.body;
	try {
		const comment = await commentService.createComment(
			content,
			authorId,
			postId,
		);
		res.status(201).json(comment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateComment = async (req, res) => {
	const { commentId, content } = req.body;
	try {
		const comment = await commentService.updateComment(commentId, content);
		res.json(comment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const deleteComment = async (req, res) => {
	const { commentId } = req.body;
	try {
		await commentService.deleteComment(commentId);
		res.json({ message: 'Comment deleted successfully' });
	} catch {
		res.status(400).json({ message: error.message });
	}
};

export { getComments, createComment, updateComment, deleteComment };
