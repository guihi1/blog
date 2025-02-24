import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			children: [
				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Register /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
