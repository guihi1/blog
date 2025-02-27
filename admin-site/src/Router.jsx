import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			children: [
				{
					element: <ProtectedRoute />,
					children: [{ path: 'dashboard', element: <Dashboard /> }],
				},
				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Register /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
