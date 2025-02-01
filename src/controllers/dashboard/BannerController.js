// import { BannerModel } from "../../models/BannerModel.js";
import path from 'path';
// import { FoodModel } from "../../models/FoodModel.js";
// import { CategoryModel } from "../../models/CategoryModel.js";

import { BannerModel } from '../../models/BannerModel.js';

export const createBanner = async (req, res) => {
	try {
        console.log('calll')
		const {  shop,category } = req.body;
        console.log('bodyyyyyyyy',req.body)

        console.log('imageeee',req.file)
		 let image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
		const response = await BannerModel.create({
			catgeory:category,
			shop: shop,
			bannerImage: image,
		});

        console.log('bannerrrr',response)

		return res.status(200).json({
			success: true,
			message: 'Created Successfully!',
		});
	} catch (error) {
        console.log('error',error)
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const updateBanner = async (req, res) => {
	try {
		const bannerId = req.params.id;
		const { product } = req.body;
		const dataToUpdate = await BannerModel.findById({ _id: bannerId });
		// let image = dataToUpdate.bannerImage
		// image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
		// console.log(req.file)
		// console.log(req.files)

		dataToUpdate.product = product;
		//   dataToUpdate.bannerImage = image;

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
         success: false,
         message: 'Deleted'
      });

   } catch (error){
      return res.status(500).json({
         success: false,
         message: 'Server error'
      });
   }
};

export const viewBanner = async (req, res) => {
   try {
       const bannerId = req.params.id;

       const banner = await BannerModel.findById({_id:bannerId});

       return res.status(200).json({
           success: true,
           message: 'Fetched',
           data: { banner: banner},
       });
   }   catch (error) {
       return res.status(500).json({
           success: false,
           message: 'server error',
       });
   }
};

export const getAllBanner = async (req, res) => {
	try {
		const category = await BannerModel.aggregate([
			// {
			// 	$lookup: {
			// 		from: FoodModel.modelName,
			// 		localField: 'foodId',
			// 		foreignField: '_id',
			// 		as: 'food',
			// 	},
			// },
			// {
			// 	$unwind: '$food',
			// },

			{
				$project: {
					// foodName: '$food.foodName',
					product: 1,
					// bannerImage: 1,
					// category: '$category.categoryName',
				},
			},
		]);
		return res.status(200).json({
			success: true,
			message: 'All Data Fetched',
			data: { banners: category },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'server error',
		});
	}
};
