const Login = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-base-100 px-4">
			<div className="w-full sm:w-96 md:w-[32rem] lg:w-[36rem] bg-base-200 p-6 rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold text-center">Sign In</h1>
				<form className="flex flex-col gap-4 m-4">
					<label className="floating-label">
						<span>Email</span>
						<input
							className="input input-md w-full"
							placeholder="Email"
							type="email"
							id="email"
							name="email"
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
						/>
					</label>
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
