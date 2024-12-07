import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
	{
		UserId: {
			type: String,
			required: true,
		},
        UserName: {
			type: String,
			required: true,
		},
		Contact: {
			type: String,
			required: true,
		},
		Status: {
			type: String,
			required: true,
		},
        Password: {
			type: String,
			required: true,
		},
        Address: {
			type: String,
			required: false,
		},
        Email_id: {
			type: String,
			required: false,
		},
        ContactNumber: {
			type: Number,
			required: true,
		},
        DeletedAt: {
			type: Date,
			required: false,
		},
        
	},
	{ timestamps: true },
);

export const ShopModel = mongoose.model('shops', shopSchema);