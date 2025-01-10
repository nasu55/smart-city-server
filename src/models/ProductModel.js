import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
    
        productName: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        descripton: {
            type: String,
            required: true,
        },
        // status: {
        // 	type: String,
        // 	required: true,
        // },
        MRP: {
            type: String,
            required: true,
        },
        

        price: {
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

export const ProductModel = mongoose.model('products', productSchema);