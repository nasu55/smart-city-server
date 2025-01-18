import mongoose from 'mongoose';

const localitySchema = new mongoose.Schema(
    {
    
        localityName: {
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

export const LocalityModel = mongoose.model('locality', localitySchema);