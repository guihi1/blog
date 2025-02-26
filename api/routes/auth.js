import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import * as userController from '../controllers/userController.js';
import * as auth from '../utils/auth.js';

const router = Router();

router.post(
	'/login',
	[
		body('email').trim().isEmail().withMessage('Enter a valid email'),
		body('password').exists().withMessage('Password is required'),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array() });
		}
		next();
	},
	userController.loginUser,
);

router.get('/verify-token', auth.authenticateUser, (req, res) => {
	res.json({ valid: true, user: req.user });
});

export default router;
