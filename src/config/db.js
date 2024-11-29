import mongoose from 'mongoose';
const ConnectMongoDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://test-user:test-paswrd@city.ztzz9.mongodb.net/project?retryWrites=true&w=majority&appName=city");
	} catch (err) {
		console.log(err);
	}
};

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB disconnected!');
});

mongoose.connection.on('connected', () => {
	console.log('MongoDB connected!');
});

export default ConnectMongoDB;