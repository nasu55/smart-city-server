import mongoose from 'mongoose';
import { ProductModel } from '../../models/ProductModel.js';
import { BannerModel } from '../../models/BannerModel.js';

export const getAllProducts = async (req, res) => {
	try {
		const shopId = req.user.userId;

		const products = await ProductModel.find({ storeId: shopId });

		const banner = await BannerModel.aggregate([
			{
				$match: {
					shop: new mongoose.Types.ObjectId(shopId),
					deletedAt: null,
				},
			},
			// {
			// 	$lookup: {
			// 		from: CategoryModel.modelName,
			// 		localField: 'category',
			// 		foreignField: '_id',
			// 		as: 'categories',
			// 		pipeline: [
			// 			{
			// 				$match: { deletedAt: null },
			// 			},
			// 		],
			// 	},
			// },
			// {
			// 	$unwind: {
			// 		path: '$categories',
			// 		preserveNullAndEmptyArrays: true,
			// 	},
			// },
			// {
			// 	$lookup: {
			// 		from: ShopModel.modelName,
			// 		localField: 'shop',
			// 		foreignField: '_id',
			// 		as: 'shops',
			// 		pipeline: [
			// 			{
			// 				$match: { deletedAt: null },
			// 			},
			// 		],
			// 	},
			// },
			// {
			// 	$unwind: {
			// 		path: '$shops',
			// 		preserveNullAndEmptyArrays: true,
			// 	},
			// },
			{
				$project: {
					// _id: 1,
					image: 1,
					shop: 1,
					category: 1,
				},
			},
		]);
		return res.status(200).json({
			success: true,
			message: 'Data Fetched Successfully',
			data: { products: products },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const viewBanner = async (req, res) => {
	try {
		const bannerId = req.params.id;

		// console.log('banner::', banner);

		return res.status(200).json({
			success: true,
			message: 'Fetched',
			data: { banner: banner },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'server error',
		});
	}
};
