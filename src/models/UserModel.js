import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
        userName: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
		
        password: {
			type: String,
			required: true,
		},
        
        email: {
			type: String,
			required: false,
		},
        
        deletedAt: {
			type: Date,
			required: false,
		},
        
	},
	{ timestamps: true },
);

export const UserModel = mongoose.model('users', userSchema);