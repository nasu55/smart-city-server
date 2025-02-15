import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		shopId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		productId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		quantity: {
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

export const CartModel = mongoose.model('carts', cartSchema);
