import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
        name: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		district: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		pincode: {
			type: Number,
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