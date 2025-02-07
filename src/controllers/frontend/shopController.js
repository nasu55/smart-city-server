import mongoose from 'mongoose';
import { ShopModel } from '../../models/ShopModel.js';

export const getAllShops = async (req, res) => {
	try {
		const categoryId = req.query.categoryId;
		const shops = await ShopModel.find({ deletedAt: null, _id: new mongoose.Types.ObjectId(categoryId) });
		console.log('shops', shops);
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
