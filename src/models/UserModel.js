import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
        name: {
			type: String,
			required: true,
		},
	 	contact: {
			type: Number,
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