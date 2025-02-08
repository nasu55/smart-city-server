import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
	{
		shop:{
			type: mongoose.Types.ObjectId,
			required:false
		},
		category:{
			type: mongoose.Types.ObjectId,
			required:false
		},
		location:{
			type: mongoose.Types.ObjectId,
			required:false
		},
        image: {
            type: String,
            required:false 
        }
	},
	{ timestamps: true },
);

export const BannerModel = mongoose.model('banners', bannerSchema);