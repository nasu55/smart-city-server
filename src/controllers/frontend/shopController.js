import mongoose from 'mongoose';
import { ShopModel } from '../../models/ShopModel.js';
import { CategoryModel } from '../../models/Categorymodel.js';
import { LocalityModel } from '../../models/LocalityModel.js';

export const getAllShops = async (req, res) => {
	try {
		const categoryId = req.query.categoryId;
		const shops = await ShopModel.aggregate([
			{
				$match: {
					deletedAt: null,
					category:new mongoose.Types.ObjectId(categoryId) 
				
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
							$match:{ deletedAt: null}
						},
						{
							$project: {categoryName: 1}
						}
					]
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
					userName: 1,
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
