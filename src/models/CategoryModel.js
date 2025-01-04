import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
    
        categoryName: {
            type: String,
            required: true,
        },
        image: {
			type: String,
			required: true,
		},

        deletedAt: {
            type: Date,
            required: false,
        },
        
    },
    { timestamps: true },
);

export const CategoryModel = mongoose.model('categories', categorySchema);