import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
	{
		

		// categoryId : {
		// 	type:  mongoose.Types.ObjectId,
		// 	required: false,
		// },
	    // foodId : {
		// 	type:  mongoose.Types.ObjectId,
		// 	required: false,
		// },
		// bannerImage : {
		// 	type: String,
		// 	required: false,
		// },
		shop:{
			type: mongoose.Types.ObjectId,
			required:false
		},
		category:{
			type: mongoose.Types.ObjectId,
			required:false
		},

        // product: {
        //     type: String,
        //     required:false 
        // },
        image: {
            type: String,
            required:false 
        }


	},
	{ timestamps: true },
);

export const BannerModel = mongoose.model('banners', bannerSchema);