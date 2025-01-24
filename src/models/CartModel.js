import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
    
        userId: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
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