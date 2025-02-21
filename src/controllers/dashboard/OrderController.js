import mongoose from 'mongoose';
import { OrderModel } from '../../models/OrderModel.js';
import { ProductModel } from '../../models/ProductModel.js';
import { ShopModel } from '../../models/ShopModel.js';

export const getAllOrdersForShop = async (req, res) => {
	try {
		// const shopId = new mongoose.Types.ObjectId("67b021526601956f7cbe9f2e"); // Replace with actual shopId
		const shopId = req.user;

		if (!shopId) {
			return res.status(400).json({
				success: false,
				message: 'Shop ID is required.',
			});
		}

		// Aggregate query to get all orders for a specific shop
		const orders = await OrderModel.aggregate([
			{
				$unwind: '$cart', // Unwind the cart array to process each product individually
			},
			{
				$lookup: {
					from: ProductModel.modelName, // Lookup the ProductModel to get product details
					localField: 'cart.productId', // Match cart's productId field with ProductModel _id
					foreignField: '_id',
					as: 'productDetails',
				},
			},
			{
				$unwind: {
					path: '$productDetails', // Flatten the product details
					preserveNullAndEmptyArrays: true, // Preserve null if product not found
				},
			},
			{
				$lookup: {
					from: ShopModel.modelName, // Lookup the ShopModel to get shop details
					localField: 'productDetails.storeId', // Match storeId in ProductModel to ShopModel _id
					foreignField: '_id',
					as: 'shopDetails',
				},
			},
			{
				$unwind: {
					path: '$shopDetails', // Flatten shop details
					preserveNullAndEmptyArrays: true, // Preserve null if shop not found
				},
			},
			{
				$match: {
					'shopDetails._id': shopId, // Filter by shopId to get orders for the specific shop
				},
			},
			{
				$project: {
					orderId: 1,
					orderDate: 1,
					status: 1,
					//   shopDetails:1,
					//   productDetails:1,
					'amount.grandTotalWithTax': 1,
					'cart.productId': 1,
					'cart.quantity': 1,
					'cart.price': 1,
					'productDetails.productName': 1,
					'productDetails.price': 1,
					'productDetails.image': 1,
					'shopDetails.shopName': 1,
					'shopDetails.contactNumber': 1,
					'shopDetails.location': 1,
				},
			},
		]);

		// If no orders are found, send an appropriate message
		if (orders.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'No orders found for this shop.',
			});
		}

		// Return the result
		res.status(200).json({
			success: true,
			message: 'Orders fetched successfully',
			data: orders,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Error fetching orders',
			error: error.message,
		});
	}
};
