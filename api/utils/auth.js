import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

const generateToken = (user) => {
	return jwt.sign(
		{ id: user.id, email: user.email, role: user.role },
		secretKey,
		{
			expiresIn: '1h',
		},
	);
};

const authenticateUser = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'Unauthorized' });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Invalid token' });
	}
};

const authorizeRoles = (roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return res
			.status(403)
			.json({ message: 'Forbidden: Insufficient permissions' });
	}
	next();
};

export { generateToken, authenticateUser, authorizeRoles };
