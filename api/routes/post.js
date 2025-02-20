import { Router } from 'express';
import * as postController from '../controllers/postController.js';
import * as auth from '../utils/auth.js';

const router = Router();

router.get('/', postController.getPosts);

router.get('/:postId', postController.getPostById);

router.post(
	'/',
	auth.authenticateUser,
	auth.authorizeRoles(['AUTHOR', 'ADMIN']),
	postController.createPost,
);

router.put(
	'/:postId',
	auth.authenticateUser,
	auth.authorizeRoles(['AUTHOR', 'ADMIN']),
	postController.updatePost,
);

router.delete(
	'/:postId',
	auth.authenticateUser,
	auth.authorizeRoles(['AUTHOR', 'ADMIN']),
	postController.deletePost,
);

export default router;
