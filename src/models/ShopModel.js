import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
	{
	
        shopName: {
			type: String,
			required: true,
		},
        ownerName: {
			type: String,
			required: true,
		},
		// status: {
		// 	type: String,
		// 	required: true,
		// },
        userName: {
			type: String,
			required: true,
		},
        password: {
			type: String,
			required: true,
		},
        address: {
			type: String,
			required: false,
		},
        email_Id: {
			type: String,
			required: false,
		},
        contactNumber: {
			type: Number,
			required: true,
		},
        deletedAt: {
			type: Date,
			required: false,
		},
        
	},
	{ timestamps: true },
);

export const ShopModel = mongoose.model('shops', shopSchema);