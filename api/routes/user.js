import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import * as auth from '../utils/auth.js';
import { body, validationResult } from 'express-validator';

const router = Router();

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUserById);

router.post(
	'/',
	[
		body('email').trim().isEmail().withMessage('Enter a valid email'),
		body('password')
			.trim()
			.isLength({ min: 5 })
			.withMessage('Password must be at least 5 characters long'),
		body('name').not().isEmpty().withMessage('Name is required'),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array()[0].msg });
		}
		next();
	},
	userController.registerUser,
);

router.put(
	'/:userId',
	auth.authenticateUser,
	auth.authorizeRoles(['ADMIN']),
	userController.updateUserRole,
);

router.delete('/:userId', userController.deleteUser);

export default router;
