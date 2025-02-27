import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});
	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			const response = await fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.email,
					username: formData.username,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data.message || 'Registration failed!');

			localStorage.setItem('token', data.token);
			setSuccess('User registered successfully!');
			setFormData({
				email: '',
				username: '',
				password: '',
				confirmPassword: '',
			});
			navigate('/dashboard');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-100 px-4">
			<div className="w-full sm:w-96 md:w-[32rem] lg:w-[36rem] bg-base-200 p-6 rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold text-center">Sign Up</h1>

				<form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
					<label className="floating-label">
						<span>Email</span>
						<input
							className="input input-md w-full"
							placeholder="Email"
							type="email"
							id="email"
							name="email"
							onChange={handleChange}
							value={formData.email}
							required
						/>
					</label>
					<label className="floating-label">
						<span>Username</span>
						<input
							className="input input-md w-full"
							placeholder="Username"
							type="text"
							id="username"
							name="username"
							onChange={handleChange}
							value={formData.username}
						/>
					</label>
					<label className="floating-label">
						<span>Password</span>
						<input
							className="input input-md w-full"
							placeholder="Password"
							type="password"
							id="password"
							name="password"
							onChange={handleChange}
							value={formData.password}
						/>
					</label>
					<label className="floating-label">
						<span>Confirm Password</span>
						<input
							className="input input-md w-full"
							placeholder="Confirm Password"
							type="password"
							id="confirm-password"
							name="confirmPassword"
							onChange={handleChange}
							value={formData.confirmPassword}
						/>
					</label>
					{error && <p className="text-error">{error}</p>}
					{success && <p className="text-success">{success}</p>}

					<button className="btn w-full bg-primary text-xl" type="submit">
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
