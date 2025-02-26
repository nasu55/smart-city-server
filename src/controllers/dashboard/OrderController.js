import mongoose from 'mongoose';
import { OrderModel } from '../../models/OrderModel.js';
import { ProductModel } from '../../models/ProductModel.js';
import { ShopModel } from '../../models/ShopModel.js';
import { UserModel } from '../../models/UserModel.js';

export const getAllOrdersForShop = async (req, res) => {
	try {
		console.log('call')
		const { userId } = req.user; // Replace with actual shopId
		console.log("🚀 ~ getAllOrdersForShop ~ shopId:", req.user)

		if (!userId) {
			return res.status(400).json({
				success: false,
				message: 'Shop ID is required.',
			});
		}

		const orders = await OrderModel.aggregate([
			{
				$match: {
					storeId:new mongoose.Types.ObjectId(userId),
				},
			},
			{
				$lookup: {
					from: UserModel.modelName,
					localField: 'userId',
					foreignField: '_id',
					as: 'userDetails',
				},
			},
			{
				$unwind: {
					path: '$userDetails',
					preserveNullAndEmptyArrays: true,
				},
			},

			// Unwind the cart to access individual products
			{
				$unwind: {
					path: '$cart',
					preserveNullAndEmptyArrays: true,
				},
			},

			// Lookup product details
			{
				$lookup: {
					from: 'products',
					localField: 'cart.productId',
					foreignField: '_id',
					as: 'productDetails',
				},
			},
			{
				$unwind: {
					path: '$productDetails',
					preserveNullAndEmptyArrays: true,
				},
			},

	

		

			// Restructure data
			{
				$group: {
					_id: '$_id',
					orderId: { $first: '$_id' },
					orderDate: { $first: '$orderdate' },
					status: { $first: '$status' },
					userDetails: { $first: '$userDetails' },
					grandTotalWithTax: { $first: '$amount.grandTotalWithTax' },
					products: {
						$push: {
							productId: '$productDetails._id',
							productName: '$productDetails.productName',
							price: '$productDetails.price',
							image: '$productDetails.image',
							quantity: '$cart.quantity',
							itemPrice: '$cart.price',
						},
					},
				},
			},
		]);
		console.log("🚀 ~ getAllOrdersForShop ~ orders:", orders)

		if (orders.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'No orders found for this shop.',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Orders fetched successfully',
			data: orders,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Error fetching orders',
			error: error.message,
		});
	}
};
