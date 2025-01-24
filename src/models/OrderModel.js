import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
    
        orderdate: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        // status: {
        // 	type: String,
        // 	required: true,
        // },
        mrp: {
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

export const OrderModel = mongoose.model('orders', orderSchema);