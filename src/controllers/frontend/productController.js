import mongoose from 'mongoose';
import { ProductModel } from '../../models/ProductModel.js';
import { BannerModel } from '../../models/BannerModel.js';
import { CartModel } from '../../models/CartModel.js';

// export const getAllProducts = async (req, res) => {
// 	try {
// 		const shopId = req.user.userId;

// 		const products = await ProductModel.find({ storeId: shopId });

// 		const banner = await BannerModel.aggregate([
// 			{
// 				$match: {
// 					shop: new mongoose.Types.ObjectId(shopId),
// 					deletedAt: null,
// 				},
// 			},
// 			// {
// 			// 	$lookup: {
// 			// 		from: CategoryModel.modelName,
// 			// 		localField: 'category',
// 			// 		foreignField: '_id',
// 			// 		as: 'categories',
// 			// 		pipeline: [
// 			// 			{
// 			// 				$match: { deletedAt: null },
// 			// 			},
// 			// 		],
// 			// 	},
// 			// },
// 			// {
// 			// 	$unwind: {
// 			// 		path: '$categories',
// 			// 		preserveNullAndEmptyArrays: true,
// 			// 	},
// 			// },
// 			// {
// 			// 	$lookup: {
// 			// 		from: ShopModel.modelName,
// 			// 		localField: 'shop',
// 			// 		foreignField: '_id',
// 			// 		as: 'shops',
// 			// 		pipeline: [
// 			// 			{
// 			// 				$match: { deletedAt: null },
// 			// 			},
// 			// 		],
// 			// 	},
// 			// },
// 			// {
// 			// 	$unwind: {
// 			// 		path: '$shops',
// 			// 		preserveNullAndEmptyArrays: true,
// 			// 	},
// 			// },
// 			{
// 				$project: {
// 					// _id: 1,
// 					image: 1,
// 					shop: 1,
// 					category: 1,
// 				},
// 			},
// 		]);
// 		return res.status(200).json({
// 			success: true,
// 			message: 'Data Fetched Successfully',
// 			data: { products: products },
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: 'Server error',
// 		});
// 	}
// };

export const getAllProducts = async (req, res) => {
	try {
		const shopId = req.query.shopId;
		console.log('userrrid',req.user)
		const userId = req.user;

		// const products = await ProductModel.find({deletedAt:null, storeId : shopId});
		const products = await ProductModel.aggregate([
			{
				$match: {
					deletedAt: null,
					// userId : userId,
					storeId: new mongoose.Types.ObjectId(shopId),
				},
			},
			
	
			{
				$lookup: {
					from: CartModel.modelName,
					localField: '_id',
					foreignField: 'productId',
					
					pipeline: [
						{
							$match: {
								userId : userId 
							} 
						},
						{
							$project: {
								quantity:1,
								_id:0
							},
						},
					],
					as: 'carts',
				},
			},
			{
				$unwind: {
					path: '$carts',
					preserveNullAndEmptyArrays: true,
				},
			},
			// {
			// 	$lookup:{
			// 		from: BannerModel.modelName,
			// 		localField: 'storeId',
			// 		foreignField: 'shop',
					
			// 		// pipeline: [
			// 		// 	{
			// 		// 		$project: {
			// 		// 			quantity:1,
			// 		// 			_id:0
			// 		// 		},
			// 		// 	},
			// 		// ],
			// 		as: 'banner',
			// 	}
			// },
			{
				$project :{
					storeId: 1,
					productName: 1,
					image: 1,
					description: 1,
					mrp: 1,
					price: 1,
					quantity: "$carts.quantity",
					banner:1
				}
			}
			
		]);

		const banner = await BannerModel.find({
			deletedAt:null, shop:shopId
		})

		return res.status(200).json({
			success: true,
			message: 'Data Fetched Successfully',
			data: { products: products,banner:banner },
		});
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

// export const viewBanner = async (req, res) => {
// 	try {
// 		const bannerId = req.params.id;

// 		// console.log('banner::', banner);

// 		return res.status(200).json({
// 			success: true,
// 			message: 'Fetched',
// 			data: { banner: banner },
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: 'server error',
// 		});
// 	}
// };
