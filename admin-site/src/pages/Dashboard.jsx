import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEyeSlash, FaEye } from 'react-icons/fa';

const Dashboard = () => {
	const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [published, setPublished] = useState(true);

	useEffect(() => {
		console.log('fetching posts');
		const fetchPosts = async () => {
			try {
				const response = await fetch('http://localhost:3000/posts');
				const data = await response.json();
				console.log(data);
				setPosts(data);
				console.log('test');
			} catch (error) {
				console.error(error);
			}
		};

		fetchPosts();
	}, []);

	const addPost = async () => {
		if (!title || !content) return;
		try {
			await fetch('http://localhost:3000/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, body: content, published }),
			});
			setTitle('');
			setContent('');
			setPublished(true);
		} catch (error) {
			console.error(error);
		}
	};

	const deletePost = async (id) => {
		try {
			await fetch(`http://localhost:3000/posts/${id}`, {
				method: 'DELETE',
			});
			setPosts(posts.filter((post) => post.id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex min-h-screen bg-base-100">
			<div className="flex-1 p-6">
				<h2 className="text-2xl font-bold mb-4">Manage Posts</h2>

				<div className="bg-base-200 p-4 rounded-lg shadow-lg">
					<h3 className="text-lg font-bold">Create New Post</h3>
					<form>
						<label className="floating-label">
							<span>Title</span>
							<input
								type="text"
								placeholder="Title"
								className="input input-bordered w-full my-2"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
						<label className="label w-full">
							<textarea
								placeholder="Content"
								className="textarea textarea-bordered w-full my-2"
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</label>
						<label className="label">
							<span className="label-text cursor-pointer">Publish</span>
							<input
								type="checkbox"
								defaultChecked
								className="checkbox checkbox-primary"
							/>
						</label>
						<button
							className="btn btn-primary w-full mt-4"
							type="submit"
							onClick={addPost}
						>
							<FaPlus className="mr-2" /> Add Post
						</button>
					</form>
				</div>

				<div className="mt-6">
					{posts.length > 0 ? (
						posts.map((post) => (
							<div
								key={post.id}
								className="bg-base-200 p-4 rounded-lg shadow-lg mb-4"
							>
								<h3 className="text-lg font-bold">{post.title}</h3>
								<p className="text-sm">{post.content}</p>
								<div className="mt-2 flex gap-3">
									<button className="btn btn-warning btn-sm" type="button">
										<FaEdit />
									</button>
									<button
										className="btn btn-error btn-sm"
										onClick={() => deletePost(post.id)}
										type="button"
									>
										<FaTrash />
									</button>
									{published ? (
										<button className="btn btn-sm btn-primary" type="button">
											<FaEye />
										</button>
									) : (
										<button className="btn btn-sm btn-primary" type="button">
											<FaEyeSlash />
										</button>
									)}
								</div>
							</div>
						))
					) : (
						<p className="text-gray-500">No posts yet.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
