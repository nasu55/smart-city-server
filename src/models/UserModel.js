import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
        UserName: {
			type: String,
			required: true,
		},
		Contact: {
			type: String,
			required: true,
		},
		
        Password: {
			type: String,
			required: true,
		},
        
        Email_id: {
			type: String,
			required: false,
		},
        
        DeletedAt: {
			type: Date,
			required: false,
		},
        
	},
	{ timestamps: true },
);

export const UserModel = mongoose.model('users', userSchema);