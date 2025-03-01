import mongoose from 'mongoose';
import { ShopModel } from '../../models/ShopModel.js';
import { CategoryModel } from '../../models/Categorymodel.js';
import { LocalityModel } from '../../models/LocalityModel.js';
import { FavouriteShopModel } from '../../models/FavouriteShopModel.js';

export const getAllShops = async (req, res) => {
	try {
		console.log('call');
		console.log('categoryId', req.query);

		const categoryId = req.query.categoryId;
		const { userId } = req.user; // Assuming user authentication is implemented

		// Match stage for filtering
		const matchStage = {
			deletedAt: null,
			status: 'isApproved',
		};
		if (categoryId) {
			matchStage.category = new mongoose.Types.ObjectId(categoryId);
		}

		const shops = await ShopModel.aggregate([
			{
				$match: matchStage,
			},
			{
				$lookup: {
					from: 'categories',
					localField: 'category',
					foreignField: '_id',
					as: 'categories',
					pipeline: [{ $match: { deletedAt: null } }, { $project: { categoryName: 1 } }],
				},
			},
			{ $unwind: { path: '$categories', preserveNullAndEmptyArrays: true } },
			{
				$lookup: {
					from: 'localities',
					localField: 'location',
					foreignField: '_id',
					as: 'locations',
				},
			},
			{ $unwind: { path: '$locations', preserveNullAndEmptyArrays: true } },

			// Lookup in FavouriteShopModel to check if the shop is favorited by the user
			{
				$lookup: {
					from: FavouriteShopModel.modelName, // Correct collection name
					localField: '_id',
					foreignField: 'shopId',
					pipeline: [
						{
							$match: {
								userId: new mongoose.Types.ObjectId(userId),
							},
						},
						{
							$project: {
								_id: 1,
							},
						},
					],
					as: 'favoriteData',
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
					// isFavorite: 1,
					// isFavorite: { $cond: { if: { $gt: [{ $size: '$fav_foods' }, 0] }, then: true, else: false } },
					isFavorite: { $gt: [{ $size: '$favoriteData' }, 0] },
					// Ensure isFavorite is included
				},
			},
		]);

		console.log('shops', shops);
		return res.status(200).json({
			success: true,
			message: 'Successful',
			data: { shops },
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

// export const getAllShops = async (req, res) => {
// 	try {
// 		console.log('call');
// 		console.log('categoryId', req.query);

// 		// Get categoryId from query params
// 		const categoryId = req.query.categoryId;

// 		// Start building the aggregation pipeline
// 		const matchStage = {
// 			deletedAt: null,
// 			status: 'isApproved',
// 		};

// 		// If categoryId is provided, add it to the match criteria
// 		if (categoryId) {
// 			matchStage.category = new mongoose.Types.ObjectId(categoryId);
// 		}

// 		const shops = await ShopModel.aggregate([
// 			{
// 				$match: matchStage, // Use the dynamic match stage
// 			},
// 			{
// 				$lookup: {
// 					from: CategoryModel.modelName,
// 					localField: 'category',
// 					foreignField: '_id',
// 					as: 'categories',
// 					pipeline: [
// 						{
// 							$match: { deletedAt: null },
// 						},
// 						{
// 							$project: { categoryName: 1 },
// 						},
// 					],
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

// 					image: 1,
// 					isFavorite: 1,
// 				},
// 			},
// 		]);

// 		console.log('shop', shops);
// 		return res.status(200).json({
// 			success: true,
// 			message: 'Successful',
// 			data: { shops: shops },
// 		});
// 	} catch (error) {
// 		console.error(error); // Log the error for debugging
// 		return res.status(500).json({
// 			success: false,
// 			message: 'Server error',
// 		});
// 	}
// };

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

export const getShop = async (req, res) => {
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

			// Lookup in FavouriteShopModel to check if the shop is favorited by the user
			{
				$lookup: {
					from: FavouriteShopModel.modelName,
					let: { shopId: '$_id' },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [{ $eq: ['$shopId', '$$shopId'] }, { $eq: ['$userId', new mongoose.Types.ObjectId(userId)] }],
								},
							},
						},
					],
					as: 'favoriteData',
				},
			},
			{
				$addFields: {
					isFavorite: { $gt: [{ $size: '$favoriteData' }, 0] }, // If there's at least one favorite entry, set isFavorite to true
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
};

export const postFavourite = async (req, res) => {
	try {
		const { userId } = req.user;
		const { shopId } = req.body;

		if (!shopId) {
			return res.status(400).json({ success: false, message: 'Shop ID is required' });
		}
		const shop = await ShopModel.findById(shopId);
		if (!shop) {
			return res.status(402).json({ success: false, message: 'Shop not found' });
		}

		const existingFavourite = await FavouriteShopModel.findOne({
			userId: userId,
			shopId: shopId,
		});

		if (existingFavourite) {
			await FavouriteProductModel.deleteOne({ userId: userId, shopId: shopId });
		} else {
			await FavouriteProductModel.create({
				userId: userId,
				shopId: shopId,
			});
		}

		return res.status(200).json({
			success: true,
			message: existingFavourite ? 'Removed from favorites' : 'Added to favorites',
		});
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

// export const postFavourite = async (req, res) => {
// 	try {
// 		// console.log(first)
// 		const { userId } = req.user;
// 		// const userId = new mongoose.Types.ObjectId('67933c82531c7919c546e8b3');
// 		const { shopId } = req.body;
// 		console.log(shopId);

// 		const favouriteShop = await FavouriteShopModel.create({
// 			userId: userId,
// 			shopId: shopId,
// 		});

// 		const shop = await ShopModel.findOne({ _id: new mongoose.Types.ObjectId(shopId) });

// 		shop.isFavorite = !shop.isFavorite;
// 		await shop.save();

// 		return res.status(200).json({
// 			success: true,
// 			message: 'favorited Successfully',
// 		});
// 	} catch (error) {
// 		console.log('err', error);
// 		return res.status(500).json({
// 			success: false,
// 			message: 'Server error',
// 		});
// 	}
// };

export const getFavourite = async (req, res) => {
	try {
<<<<<<< Updated upstream
		console.log('ccccccfc')
		const userId = req.user;
=======
		console.log('calllllllllll');

		const { userId } = req.user;
>>>>>>> Stashed changes
		// const userId = new mongoose.Types.ObjectId('67933c82531c7919c546e8b3');
		console.log('🚀 ~ getFavourite ~ userId:', userId);

		const shops = await FavouriteShopModel.aggregate([
			{
				$match: { userId: new mongoose.Types.ObjectId(userId) },
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
		console.log('🚀 ~ getFavourite ~ shops:', shops);

		return res.status(200).json({
			success: true,
			message: 'Favourite shops retrieved successfully',
			data: { shops: shops }, // Extract only the 'shops' field
		});
	} catch (error) {
		console.log('error', error);
	}
};
