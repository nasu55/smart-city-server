import mongoose from 'mongoose';
import { ShopModel } from '../../models/ShopModel.js';
import { CategoryModel } from '../../models/Categorymodel.js';
import { LocalityModel } from '../../models/LocalityModel.js';
import { FavouriteShopModel } from '../../models/FavouriteShopModel.js';

export const getAllShops = async (req, res) => {
	try {
		console.log('call');
		console.log('categoryId', req.query);

		// Get categoryId from query params
		const categoryId = req.query.categoryId;
		

	

		// Start building the aggregation pipeline
		const matchStage = {
			deletedAt: null,
			status: 'isApproved',
		};

		// If categoryId is provided, add it to the match criteria
		if (categoryId) {
			matchStage.category = new mongoose.Types.ObjectId(categoryId);
		}

		const shops = await ShopModel.aggregate([
		
			{
				$match: matchStage, // Use the dynamic match stage
			},
			{
				$lookup: {
					from: CategoryModel.modelName,
					localField: 'category',
					foreignField: '_id',
					as: 'categories',
					pipeline: [
						{
							$match: { deletedAt: null },
						},
						{
							$project: { categoryName: 1 },
						},
					],
				},
			},
			{
				$unwind: {
					path: '$categories',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: LocalityModel.modelName,
					localField: 'location',
					foreignField: '_id',
					as: 'locations',
				},
			},
			{
				$unwind: {
					path: '$locations',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$project: {
					_id: 1,
					shopName: 1,
					ownerName: 1,
					shopDescription: 1,
					email_Id: 1,
					location: '$locations.localityName',
					category: '$categories.categoryName',
					contactNumber: 1,
			
					image: 1,
					isFavorite: 1,
				},
			},
		]);

		console.log('shop', shops);
		return res.status(200).json({
			success: true,
			message: 'Successful',
			data: { shops: shops },
		});
	} catch (error) {
		console.error(error); // Log the error for debugging
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

// export const getAllShops = async (req, res) => {
// 	try {
// 		console.log('call')
// 		console.log('categoryId',req.query)
// 		const categoryId = req.query.categoryId;

// 		const shops = await ShopModel.aggregate([
// 			{
// 				$match: {
// 					deletedAt: null,
// 					category:new mongoose.Types.ObjectId(categoryId),
// 					status: "isApproved"
// 				},
// 			},
// 			{
// 				$lookup: {
// 					from: CategoryModel.modelName,
// 					localField: 'category',
// 					foreignField: '_id',
// 					as: 'categories',
// 					pipeline: [
// 						{
// 							$match:{ deletedAt: null}
// 						},
// 						{
// 							$project: {categoryName: 1}
// 						}
// 					]
// 				},
// 			},
// 			{
// 				$unwind: {
// 					path: '$categories',
// 					preserveNullAndEmptyArrays: true,
// 				},
// 			},
// 			{
// 				$lookup: {
// 					from: LocalityModel.modelName,
// 					localField: 'location',
// 					foreignField: '_id',
// 					as: 'locations',
// 				},
// 			},
// 			{
// 				$unwind: {
// 					path: '$locations',
// 					preserveNullAndEmptyArrays: true,
// 				},
// 			},
// 			{
// 				$project: {
// 					_id: 1,
// 					shopName: 1,
// 					ownerName: 1,
// 					shopDescription: 1,
// 					email_Id: 1,
// 					location: '$locations.localityName',
// 					category: '$categories.categoryName',
// 					contactNumber: 1,
// 					userName: 1,
// 					image: 1,
// 				},
// 			},
// 		]);
// 		console.log('shop', shops);
// 		return res.status(200).json({
// 			success: true,
// 			message: 'Sucessfull',
// 			data: { shops: shops },
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: 'Server error',
// 		});
// 	}
// };
export const getFeaturedShops = async (req, res) => {
	try {
		// const categoryId = req.query.categoryId;
		const shops = await ShopModel.aggregate([
			{
				$match: {
					deletedAt: null,
					// category:new mongoose.Types.ObjectId(categoryId),
					status: 'isApproved',
					featured: true,
				},
			},
			{
				$lookup: {
					from: CategoryModel.modelName,
					localField: 'category',
					foreignField: '_id',
					as: 'categories',
					pipeline: [
						{
							$match: { deletedAt: null },
						},
						{
							$project: { categoryName: 1 },
						},
					],
				},
			},
			{
				$unwind: {
					path: '$categories',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: LocalityModel.modelName,
					localField: 'location',
					foreignField: '_id',
					as: 'locations',
				},
			},
			{
				$unwind: {
					path: '$locations',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$project: {
					_id: 1,
					shopName: 1,
					ownerName: 1,
					shopDescription: 1,
					email_Id: 1,
					location: '$locations.localityName',
					category: '$categories.categoryName',
					contactNumber: 1,
					isFavorite: 1,
			
					image: 1,
				},
			},
		]);
		console.log('shop', shops);
		return res.status(200).json({
			success: true,
			message: 'Sucessfull',
			data: { shops: shops },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const getShop = async (req,res,) => {
	try {

		const shopId = req.params.id;

		const shops = await ShopModel.aggregate([
			{
				$match: {
					deletedAt: null,
					_id: new mongoose.Types.ObjectId(shopId),
					// category:new mongoose.Types.ObjectId(categoryId),
					status: 'isApproved',
					featured: true,
				},
			},
			{
				$lookup: {
					from: CategoryModel.modelName,
					localField: 'category',
					foreignField: '_id',
					as: 'categories',
					pipeline: [
						{
							$match: { deletedAt: null },
						},
						{
							$project: { categoryName: 1 },
						},
					],
				},
			},
			{
				$unwind: {
					path: '$categories',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: LocalityModel.modelName,
					localField: 'location',
					foreignField: '_id',
					as: 'locations',
				},
			},
			{
				$unwind: {
					path: '$locations',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$project: {
					_id: 1,
					shopName: 1,
					ownerName: 1,
					shopDescription: 1,
					email_Id: 1,
					location: '$locations.localityName',
					category: '$categories.categoryName',
					contactNumber: 1,
					isFavorite: 1,
			
					image: 1,
				},
			},
		]);
		console.log('shop', shops);
		return res.status(200).json({
			success: true,
			message: 'Sucessfull',
			data: { shops: shops.at(0) },
		});


		
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
	
}

export const postFavourite = async (req, res) => {
	try {
		const {userId} = req.user;
		// const userId = new mongoose.Types.ObjectId('67933c82531c7919c546e8b3');
		const {shopId} = req.body;
		console.log(shopId);

		const favouriteShop = await FavouriteShopModel.create({
			userId: userId,
			shopId: shopId,
		});

		return res.status(200).json({
			success: true,
			message: 'favorited Successfully',
		});
	} catch (error) {
		console.log('err', error);
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const getFavourite = async (req, res) => {
	try {
		const userId = req.user;
		// const userId = new mongoose.Types.ObjectId('67933c82531c7919c546e8b3');

		const shops = await FavouriteShopModel.aggregate([
			{
				$match: { userId },
			},
			{
				$project: {
					_id: 0,
					shopId: 1,
				},
			},
			{
				$lookup: {
					from: ShopModel.modelName,
					localField: 'shopId',
					foreignField: '_id',
					as: 'shops',
					pipeline: [
						{
							$project: {
								shopName: 1,
								shopDescription: 1,
								image: 1,
								location: 1,
								ownerName: 1,
								contactNumber: 1,
							},
						},
						{
							$lookup: {
								from: LocalityModel.modelName,
								localField: 'location',
								foreignField: '_id',
								as: 'location',
								pipeline: [
									{
										$project: {
											localityName: 1,
											_id: 1,
										},
									},
								],
							},
						},
						{
							$unwind: {
								path: '$location',
								preserveNullAndEmptyArrays: true,
							},
						},
					],
				},
			},
			{
				$unwind: {
					path: '$shops',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$project: {
					shopId: 0,
				},
			},
		]);

		return res.status(200).json({
			success: true,
			message: 'Favourite shops retrieved successfully',
			data: { shops: shops }, // Extract only the 'shops' field
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
