import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		if (!formData.email || !formData.password) {
			setError('Please fill in all fields');
			return;
		}

		try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data.message || 'Login failed!');
			localStorage.setItem('token', data.token);
			setFormData({ email: '', password: '' });
			setTimeout(() => navigate('/dashboard'), 1500);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-100 px-4">
			<div className="w-full sm:w-96 md:w-[32rem] lg:w-[36rem] bg-base-200 p-6 rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold text-center">Sign In</h1>
				<form className="flex flex-col gap-4 m-4" onSubmit={handleSubmit}>
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
					{error && <p className="text-error">{error}</p>}

					<button className="btn w-full bg-primary text-xl" type="submit">
						Login
					</button>
				</form>
				<p className="text-center text-sm ">
					Don&apos;t have an account? Sign up{' '}
					<a className="link link-primary" href="/register">
						here
					</a>
					!
				</p>
			</div>
		</div>
	);
};

export default Login;
