import mongoose from 'mongoose';

const FavouriteShopSchema = new mongoose.Schema(
	{
		shopId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true },
);

export const FavouriteShopModel = mongoose.model('favourite_shops', FavouriteShopSchema);
