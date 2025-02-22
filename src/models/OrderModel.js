import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		orderdate: {
			type: Date,
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		cart: [
			{
				productId: {
					type: mongoose.Types.ObjectId,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],

		amount: {
			subtotal: {
				type: Number,
				required: true,
			},
			grandTotal: {
				type: Number,
				required: true,
			},
			tax: {
				type: Number,
				required: true,
			},
			discount: {
				type: Number,
				required: true,
			},
			grandTotalWithTax: {
				type: Number,
				required: true,
			},
		},

	

		deletedAt: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: true },
);

export const OrderModel = mongoose.model('orders', orderSchema);
