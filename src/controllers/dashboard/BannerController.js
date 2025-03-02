import path from 'path';

import { ProductModel } from '../../models/ProductModel.js';
import { ShopModel } from '../../models/ShopModel.js';
import { CategoryModel } from '../../models/Categorymodel.js';
import { BannerModel } from '../../models/BannerModel.js';
import mongoose from 'mongoose'; // Ensure mongoose is imported

export const createBanner = async (req, res) => {
	try {
		const { shop, category } = req.body;

		let image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
		const response = await BannerModel.create({
			category: category,
			shop: shop,
			image: image,
		});


		return res.status(200).json({
			success: true,
			message: 'Created Successfully!',
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const updateBanner = async (req, res) => {
	try {
		const bannerId = req.params.id;
		const { shop, category } = req.body;
		let File = req.body.image;
		const dataToUpdate = await BannerModel.findById({ _id: bannerId });
		if (req.file) {
			File = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
		}
		console.log(req.file);
		console.log(req.files);

		dataToUpdate.category = category;
		dataToUpdate.shop = shop;
		dataToUpdate.image = File;

		await dataToUpdate.save();
		return res.status(200).json({
			success: true,
			message: 'Updated',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const deleteBanner = async (req, res) => {
	try {
		const bannerId = req.params.id;

		await BannerModel.findByIdAndDelete(bannerId);

		return res.status(200).json({
			success: true,
			message: 'Deleted Successfully',
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

		const banner = (
			await BannerModel.aggregate([
				{
					$match: {
						_id: new mongoose.Types.ObjectId(bannerId),
						deletedAt: null,
					},
				},
				{
					$project: {
						image: 1,
						shop: 1,
						category: 1,

					},
				},
			])
		).at(0);

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


export const getAllBanner = async (req, res) => {
	try {
		const banners = await BannerModel.aggregate([
			{
				$lookup: {
					from: ShopModel.modelName,
					localField: 'shop',
					foreignField: '_id',
					as: 'shop',
				},
			},
			{
				$unwind: '$shop',
			},

			{
				$project: {
					shop: '$shop.shopName',
					image: 1,
				},
			},
		]);
		return res.status(200).json({
			success: true,
			message: 'All Data Fetched',
			data: { banners: banners },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'server error',
		});
	}
};
