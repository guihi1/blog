import express from 'express';
import routes from './routes/index.js';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON bodies

app.use('/users', routes.user);
app.use('/posts', routes.post);
app.use('/comments', routes.comment);
app.use('/', routes.auth);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
