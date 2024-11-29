import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		Product_id: {
			type: String,
			required: true,
		},
        Product_name: {
			type: String,
			required: true,
		},
        Product_brand: {
			type: String,
			required: true,
		},
        Product_category: {
			type: String,
			required: true,
		},
        Product_price: {
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

export const ProductModel = mongoose.model('products', productSchema);