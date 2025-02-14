import mongoose from 'mongoose';
import { ShopModel } from '../../models/ShopModel.js';
import { CategoryModel } from '../../models/Categorymodel.js';
import { LocalityModel } from '../../models/LocalityModel.js';


export const getAllShops = async (req, res) => {
    try {
        console.log('call');
        console.log('categoryId', req.query);

        // Get categoryId from query params
        const categoryId = req.query.categoryId;

        // Start building the aggregation pipeline
        const matchStage = {
            deletedAt: null,
            status: "isApproved"
        };

        // If categoryId is provided, add it to the match criteria
        if (categoryId) {
            matchStage.category = new mongoose.Types.ObjectId(categoryId);
        }

        const shops = await ShopModel.aggregate([
            {
                $match: matchStage,  // Use the dynamic match stage
            },
            {
                $lookup: {
                    from: CategoryModel.modelName,
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categories',
                    pipeline: [
                        {
                            $match: { deletedAt: null }
                        },
                        {
                            $project: { categoryName: 1 }
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
					isFavorite:1,
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
					status: "isApproved",
					featured:true
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
					isFavorite:1,
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
export const favoritedShop = async (req, res, next) => {
	try {
		const shopId = req.params.id;
		const shop = await ShopModel.findOne({ _id: shopId });
		if (!shop) {
			return res.status(422).json({
				success: false,
				message: 'shop not found',
			});
		}
		shop.isFavorite = shop.isFavorite === true ? false : true;
		await shop.save();

		res.status(200).json({
			success: true,
			message: shop.isFavorite ? 'shop is favourited' : ' shop is not favourited',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

