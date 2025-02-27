import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setIsAuthenticated(false);
				return;
			}

			try {
				const response = await fetch('http://localhost:3000/verify-token', {
					headers: { Authorization: `Bearer ${token}` },
				});
				console.log(response);

				setIsAuthenticated(response.ok);
			} catch (error) {
				console.log(error);
				setIsAuthenticated(false);
			}
		};

		verifyToken();
	}, []);

	if (isAuthenticated === null) return <div>Loading...</div>;
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
