import { ShopModel } from '../../models/ShopModel.js';
import { CategoryModel } from '../../models/Categorymodel.js';
import { LocalityModel } from '../../models/LocalityModel.js';
import { BannerModel } from '../../models/BannerModel.js';

export const getHomePage = async (req, res) => {
	try {
		const categories = await CategoryModel.find();

		const banners = await BannerModel.aggregate([
			{
				$project: {
					shop: 1,
					image: 1,
				},
			},
		]);

		const shops = await ShopModel.find({ featured: true, deletedAt: null });

		return res.status(200).json({
			success: true,
			message: 'Data Fetched Successfully',
			data: { categories: categories, banners: banners, shops: shops },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const getLocalities = async (req, res) => {
	try {
		const localities = await LocalityModel.find();

		return res.status(200).json({
			success: true,
			message: 'Data Fetched Successfully',
			data: { localities: localities },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
