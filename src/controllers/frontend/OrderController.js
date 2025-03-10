import mongoose from 'mongoose';
import { CartModel } from '../../models/CartModel.js';
import { OrderModel } from '../../models/OrderModel.js';
import { ProductModel } from '../../models/ProductModel.js';
import { ShopModel } from '../../models/ShopModel.js';

export const createOrder = async (req, res, next) => {
	try {
		const { userId } = req.user;
		console.log(req.user)
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
					storeId : '$products.storeId'
				},
			},
		]);

		// console.log(carts)
		// console.log('carts::::::::::::',carts[0].storeId)

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
				productId: cart._id,
				quantity: cart.quantity,
				price: cart.price,
			};
		});

		// Calculate discount (difference between subtotal and grandTotal)
		const discount = subtotal - grandTotal;

		// Calculate grandTotalWithTax (grandTotal + tax)
		const grandTotalWithTax = grandTotal + tax;

		const amount = {
			subtotal: subtotal,
			grandTotal: grandTotal,
			tax: tax,
			discount: discount,
			grandTotalWithTax: grandTotalWithTax,
		};

		const order = await OrderModel.create({
			userId,
			cart: cartItems,
			orderdate: new Date(),
			amount: amount,
			storeId : carts[0].storeId,
		});

		await CartModel.deleteMany({userId:userId})

		res.status(200).json({
			success: true,
			message: 'Order created successfully',
			data : {
				orderId : order._id,
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Error creating order',
			error: error.message,
		});
	}
};

export const getAllOrdersForUser = async (req, res) => {
	try {
	  const {userId} = req.user;
	//   const userId = '67933c82531c7919c546e8b3'; // Replace with actual user ID

  
	  if (!userId) {
		return res.status(400).json({
		  success: false,
		  message: 'User ID is required.',
		});
	  }
  
	  // Aggregate query to get all orders for a specific user
	  const orders = await OrderModel.aggregate([
		{
		  $match: {
			userId: new mongoose.Types.ObjectId(userId), // Match orders by userId
		  },
		},
		{
		  $unwind: '$cart', // Unwind the cart array to process each product
		},
		{
		  $lookup: {
			from: ProductModel.modelName, // Lookup ProductModel to get product details
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
			from: ShopModel.modelName, // Lookup ShopModel to get shop details
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
		  $group: {
			_id: '$_id', // Group by order ID
			orderdate: { $first: '$orderdate' },
			amount: { $first: '$amount.grandTotalWithTax' }, // Get grandTotalWithTax for amount
			shopDetails: { $first: '$shopDetails' },
			
		  },
		},
		{
		  $project: {
			_id: 0,  // Hide default _id
			orderId: '$_id',
			orderdate: 1,
			amount: 1,
			products: 1,
			shopDetails: {
			  _id: 1,
			  shopName: 1,
			  shopDescription: 1,
			  ownerName: 1,
			  image: 1,
			  email_Id: 1,
			  contactNumber: 1,
		
			  location: 1,
			  category: 1,
			},
		  },
		},
	  ]);

  
	  // Return the result
	  res.status(200).json({
		success: true,
		message: 'Orders fetched successfully',
		data: { orders : orders },
	  });
	} catch (error) {
	  console.log(error);
	  res.status(500).json({
		success: false,
		message: 'Error fetching orders for the user',
		error: error.message,
	  });
	}
  };
  



// API to fetch order details by orderId for a specific user
export const getOrderbyId = async (req, res) => {
	try {
	  const { orderId } = req.params; 
	  const { userId } = req.user;

	   // Fetch orderId from request params
	//   const userId = '67933c82531c7919c546e8b3'; 
  
	  if (!orderId) {
		return res.status(400).json({
		  success: false,
		  message: 'Order ID is required.',
		});
	  }
  
	  if (!userId) {
		return res.status(400).json({
		  success: false,
		  message: 'User ID is required.',
		});
	  }
  
	  // Aggregate query to fetch order, product, and shop details
	//   const orderDetails = await OrderModel.aggregate([
	// 	{
	// 	  $match: {
	// 		_id: new mongoose.Types.ObjectId(orderId),  // Match by orderId
	// 		userId: new mongoose.Types.ObjectId(userId), // Match by userId
	// 	  },
	// 	},
	// 	{
	// 	  $unwind: '$cart',  // Unwind the cart array to process each product
	// 	},
	// 	{
	// 	  $lookup: {
	// 		from: ProductModel.modelName, // Lookup ProductModel to get product details
	// 		localField: 'cart.productId',  // Match cart's productId field with ProductModel _id
	// 		foreignField: '_id',
	// 		as: 'productDetails',
	// 	  },
	// 	},
	// 	{
	// 	  $unwind: {
	// 		path: '$productDetails',  // Unwind product details
	// 		preserveNullAndEmptyArrays: true,
	// 	  },
	// 	},
	// 	{
	// 	  $lookup: {
	// 		from: ShopModel.modelName,  // Lookup ShopModel to get shop details
	// 		localField: 'productDetails.storeId',  // Match storeId in ProductModel to ShopModel _id
	// 		foreignField: '_id',
	// 		as: 'shopDetails',
	// 	  },
	// 	},
	// 	{
	// 	  $unwind: {
	// 		path: '$shopDetails',  // Unwind shop details
	// 		preserveNullAndEmptyArrays: true,
	// 	  },
	// 	},
	// 	{
	// 	  $group: {
	// 		_id: '$_id',  // Group by order ID to consolidate products
	// 		orderId: { $first: '$_id' },
	// 		orderDate: { $first: '$orderdate' },
	// 		// amount: { $first: '$amount' },
	// 		grandTotal: '$amount[0].grandTotal',
	// 		grandTotalWithTax: '$amount[0].grandTotalWithTax',
	// 		tax: '$amount[0].tax',
	// 		subtotal: '$amount[0].subtotal',
	// 		discount: '$amount[0].discount',
	// 		shopDetails: { $first: '$shopDetails' },
	// 		products: {  // Group all products into an array
	// 		  $push: {
	// 			productId: '$productDetails._id',
	// 			productName: '$productDetails.productName',
	// 			image: '$productDetails.image',
	// 			description: '$productDetails.description',
	// 			mrp: '$productDetails.mrp',
	// 			price: '$productDetails.price',
	// 			quantity: '$cart.quantity',
	// 		  },
	// 		},
	// 	  },
	// 	},
	// 	{
	// 	  $project: {
	// 		_id: 0,  // Hide the default MongoDB _id
	// 		orderId: 1,
	// 		orderDate: 1,
	// 		amount: 1,
	// 		products: 1,
	// 		shopDetails: {
	// 		  _id: 1,
	// 		  shopName: 1,
	// 		  shopDescription: 1,
	// 		  ownerName: 1,
	// 		  image: 1,
	// 		  email_Id: 1,
	// 		  contactNumber: 1,
	// 		},
	// 	  },
	// 	},
	//   ]);
  

	// const orderDetails = await OrderModel.aggregate([
	// 	{
	// 	  $match: {
	// 		_id: new mongoose.Types.ObjectId(orderId), // Match by orderId
	// 		userId: new mongoose.Types.ObjectId(userId), // Match by userId
	// 	  },
	// 	},
	// 	{
	// 	  $unwind: '$cart', // Unwind the cart array to process each product
	// 	},
	// 	{
	// 	  $lookup: {
	// 		from: ProductModel.modelName, // Lookup ProductModel to get product details
	// 		localField: 'cart.productId', // Match cart's productId field with ProductModel _id
	// 		foreignField: '_id',
	// 		as: 'productDetails',
	// 	  },
	// 	},
	// 	{
	// 	  $unwind: {
	// 		path: '$productDetails', // Unwind product details
	// 		preserveNullAndEmptyArrays: true,
	// 	  },
	// 	},
	// 	{
	// 	  $lookup: {
	// 		from: ShopModel.modelName, // Lookup ShopModel to get shop details
	// 		localField: 'productDetails.storeId', // Match storeId in ProductModel to ShopModel _id
	// 		foreignField: '_id',
	// 		as: 'shopDetails',
	// 	  },
	// 	},
	// 	{
	// 	  $unwind: {
	// 		path: '$shopDetails', // Unwind shop details
	// 		preserveNullAndEmptyArrays: true,
	// 	  },
	// 	},
	// 	{
	// 	  $group: {
	// 		_id: '$_id', // Group by order ID to consolidate products
	// 		orderId: { $first: '$_id' },
	// 		orderDate: { $first: '$orderdate' },
	// 		grandTotal: { $first: { $arrayElemAt: ['$amount.grandTotal', 0] } }, // Accessing the first element of the array
	// 		grandTotalWithTax: { $first: { $arrayElemAt: ['$amount.grandTotalWithTax', 0] } },
	// 		tax: { $first: { $arrayElemAt: ['$amount.tax', 0] } },
	// 		subtotal: { $first: { $arrayElemAt: ['$amount.subtotal', 0] } },
	// 		discount: { $first: { $arrayElemAt: ['$amount.discount', 0] } },
	// 		shopDetails: { $first: '$shopDetails' },
	// 		products: { // Group all products into an array
	// 		  $push: {
	// 			productId: '$productDetails._id',
	// 			productName: '$productDetails.productName',
	// 			image: '$productDetails.image',
	// 			description: '$productDetails.description',
	// 			mrp: '$productDetails.mrp',
	// 			price: '$productDetails.price',
	// 			quantity: '$cart.quantity',
	// 		  },
	// 		},
	// 	  },
	// 	},
	// 	{
	// 	  $project: {
	// 		_id: 0, // Hide the default MongoDB _id
	// 		orderId: 1,
	// 		orderDate: 1,
	// 		grandTotal: 1,
	// 		grandTotalWithTax: 1,
	// 		tax: 1,
	// 		subtotal: 1,
	// 		discount: 1,
	// 		products: 1,
	// 		shopDetails: {
	// 		  _id: 1,
	// 		  shopName: 1,
	// 		  shopDescription: 1,
	// 		  ownerName: 1,
	// 		  image: 1,
	// 		  email_Id: 1,
	// 		  contactNumber: 1,
	// 		},
	// 	  },
	// 	},
	//   ]);

	const orderDetails = await OrderModel.aggregate([
		{
		  $match: {
			_id: new mongoose.Types.ObjectId(orderId), // Match by orderId
			userId: new mongoose.Types.ObjectId(userId), // Match by userId
		  },
		},
		{
		  $unwind: '$cart', // Unwind the cart array to process each product
		},
		{
		  $lookup: {
			from: ProductModel.modelName, // Lookup ProductModel to get product details
			localField: 'cart.productId', // Match cart's productId field with ProductModel _id
			foreignField: '_id',
			as: 'productDetails',
		  },
		},
		{
		  $unwind: {
			path: '$productDetails', // Unwind product details
			preserveNullAndEmptyArrays: true,
		  },
		},
		{
		  $lookup: {
			from: ShopModel.modelName, // Lookup ShopModel to get shop details
			localField: 'productDetails.storeId', // Match storeId in ProductModel to ShopModel _id
			foreignField: '_id',
			as: 'shopDetails',
		  },
		},
		{
		  $unwind: {
			path: '$shopDetails', // Unwind shop details
			preserveNullAndEmptyArrays: true,
		  },
		},
		{
		  $group: {
			_id: '$_id', // Group by order ID to consolidate products
			orderId: { $first: '$_id' },
			orderDate: { $first: '$orderdate' },
			grandTotal: { $first: '$amount.grandTotal' }, // Directly access the field
			grandTotalWithTax: { $first: '$amount.grandTotalWithTax' },
			tax: { $first: '$amount.tax' },
			subtotal: { $first: '$amount.subtotal' },
			discount: { $first: '$amount.discount' },
			shopDetails: { $first: '$shopDetails' },
			products: { // Group all products into an array
			  $push: {
				_id: '$productDetails._id',
				productName: '$productDetails.productName',
				image: '$productDetails.image',
				description: '$productDetails.description',
				mrp: '$productDetails.mrp',
				price: '$productDetails.price',
				quantity: '$cart.quantity',
			  },
			},
		  },
		},
		{
		  $project: {
			_id: 0, // Hide the default MongoDB _id
			orderId: 1,
			orderDate: 1,
			grandTotal: 1,
			grandTotalWithTax: 1,
			tax: 1,
			subtotal: 1,
			discount: 1,
			products: 1,
			shopDetails: {
			  _id: 1,
			  shopName: 1,
			  shopDescription: 1,
			  ownerName: 1,
			  image: 1,
			  email_Id: 1,
			  contactNumber: 1,
			},
		  },
		},
	  ]);
	  
	  
	  // If no orders found, return a 404 response
	  if (orderDetails.length === 0) {
		return res.status(404).json({
		  success: false,
		  message: 'Order not found for this user.',
		});
	  }
  
	  // Return the order details with product and shop information
	  return res.status(200).json({
		success: true,
		message: 'Order details fetched successfully',
		data: {orders : orderDetails[0]},  // Since we group by order ID, we return the first (and only) document
	  });
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({
		success: false,
		message: 'Error fetching order details',
		error: error.message,
	  });
	}
  };
  
  
