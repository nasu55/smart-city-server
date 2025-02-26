import mongoose from 'mongoose';
import { CartModel } from '../../models/CartModel.js';
import { ProductModel } from '../../models/ProductModel.js';

export const createCart = async (req, res) => {
	try {
		const {userId} = req.user
		// const userId = new mongoose.Types.ObjectId('67b80e189ab4b6841a087697');
		const { productId, shopId, quantity } = req.body;

		if (quantity==0 ){
			return res.status(400).json({ message: 'Quantity cannot be 0' });
		};



        const existingItem = await CartModel.findOne({ userId, productId });
        
        if (existingItem) {
            existingItem.quantity = Number(quantity);
            await existingItem.save();
        } else {
            await CartModel.create({
                userId: userId,
                shopId: shopId,
                productId: productId,
                quantity: quantity, 
            });
        }

		const carts = await CartModel.aggregate([
			{
				$match: {
					userId: new mongoose.Types.ObjectId(userId),
				},
			},
			{
				$lookup: {
					from: ProductModel.modelName,
					localField: 'productId',
					foreignField: '_id',
					as: 'products',
					pipeline: [
						{
							$project: {
								productName: 1,
								image: 1,
								mrp: 1,
								price: 1,
								description: 1,
								storeId: 1,
							},
						},
					],
				},
			},
			{
				$unwind: '$products',
			},

			{
				$project: {
					products:1,
					_id: '$products._id',
					quantity: 1,
					mrp: '$products.mrp',
					description: '$products.description',
					price: '$products.price',
					productName: '$products.productName',
					image: '$products.image',
				},
			},
		]);

		// console.log('prodddddd',carts)
		let subtotal = 0;
		let grandTotal = 0;
		let tax = 30;

		const cartItems = carts.map((cart) => {
			// Calculate subtotal and grandTotal
			const itemSubtotal = parseInt(cart.mrp) * cart.quantity;
			const itemGrandTotal = cart.price * cart.quantity;

			// Accumulate the subtotal and grandTotal
			subtotal += itemSubtotal;
			grandTotal += itemGrandTotal;

			return {
				...cart,
			};
		});

		// Calculate discount (difference between subtotal and grandTotal)
		const discount = subtotal - grandTotal;

		// Calculate grandTotalWithTax (grandTotal + tax)
		const grandTotalWithTax = grandTotal + tax;

		return res.status(200).json({
			success: true,
			message: 'Created Successfully',
			data: {
				carts: {
					cartItems,
					subtotal,
					grandTotal,
					discount,
					grandTotalWithTax,
					tax,
				},
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const getAllCarts = async (req, res) => {
	try {
		const { userId } = req.user;
		// const userId = new mongoose.Types.ObjectId('67933c82531c7919c546e8b3');


		const carts = await CartModel.aggregate([
			{
				$match: {
					userId: new mongoose.Types.ObjectId(userId),
				},
			},
			{
				$lookup: {
					from: ProductModel.modelName,
					localField: 'productId',
					foreignField: '_id',
					as: 'products',
					pipeline: [
						{
							$project: {
								productName: 1,
								image: 1,
								mrp: 1,
								price: 1,
								description: 1,
								storeId: 1,
							},
						},
					],
				},
			},
			{
				$unwind: '$products',
			},

			{
				$project: {
					_id: '$products._id',
					quantity: 1,
					mrp: '$products.mrp',
					description: '$products.description',
					price: '$products.price',
					productName: '$products.productName',
					image: '$products.image',
					storeId: '$products.storeId'
				},
			},
		]);

		// console.log('prodddddd',carts)
		let subtotal = 0;
		let grandTotal = 0;
		let tax = 30;

		const cartItems = carts.map((cart) => {
			// Calculate subtotal and grandTotal
			const itemSubtotal = parseInt(cart.mrp) * cart.quantity;
			const itemGrandTotal = cart.price * cart.quantity;

			// Accumulate the subtotal and grandTotal
			subtotal += itemSubtotal;
			grandTotal += itemGrandTotal;

			console.log(cart)

			return {
				...cart,
			};
		});

		// Calculate discount (difference between subtotal and grandTotal)
		const discount = subtotal - grandTotal;

		// Calculate grandTotalWithTax (grandTotal + tax)
		const grandTotalWithTax = grandTotal + tax;

		return res.status(200).json({
			success: true,
			message: 'Fetched Successfully',
			data: {
				carts: {
					cartItems,
					subtotal,
					grandTotal,
					discount,
					grandTotalWithTax,
					tax,
					storeId : carts.storeId
				},
			},
		});
	} catch (error) {
		console.log(error)
		// return res.status(500).json({
		// 	success: false,
		// 	message: 'Server error',
		// });
	}
};
export const deleteOne = async (req, res) => {
	try {
		const { userId } = req.user;
		const { productId } = req.body;
		const carts = await CartModel.deleteOne({ userId: userId, productId: productId });

		return res.status(200).json({
			success: true,
			message: 'Deleted',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
export const deleteMany = async (req, res) => {
	try {
		const { userId } = req.user;
		const carts = await CartModel.deleteMany({ userId: userId });

		return res.status(200).json({
			success: true,
			message: 'Deleted',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const quantityChange = async (req, res) => {
	try {
		const { userId } = req.user;
		const { quantity, productId } = req.body;
		const carts = await CartModel.find({ userId: userId, productId: productId });

		carts.quantity = quantity;

		await carts.save();

		return res.status(200).json({
			success: true,
			message: 'Updated',
			data: { carts: carts },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};


