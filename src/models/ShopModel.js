import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
	{
		shopName: {
			type: String,
			required: true,
		},
		shopDescription: {
			type: String,
			required: false,
		},
		ownerName: {
			type: String,
			required: true,
		},
		image: {
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
			required: false,
		},
		location: {
			type: mongoose.Types.ObjectId,
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
			default: null,
		},
		featured: {
			type: Boolean,
			required: false,
			default: false,
		},
		category: {
			type:  mongoose.Types.ObjectId,
			required: false,
		},
	},
	{ timestamps: true },
);

export const ShopModel = mongoose.model('shops', shopSchema);
