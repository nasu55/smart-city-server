const app = express();
import express from 'express';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import { cwd } from 'process';
import ConnectMongoDB from './src/config/db.js';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use('/uploads', express.static(cwd() + '/uploads', { maxAge: 31557600 }));
ConnectMongoDB();
const  PORT  = 5000;
app.listen(PORT, async () => {
	console.log(`Server listening to the port ${PORT}`);
});