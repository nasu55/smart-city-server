import { ShopModel } from '../../models/ShopModel.js';
import { LocalityModel } from '../../models/LocalityModel.js';
import path from 'path';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../../env.js';
import mongoose from 'mongoose';
import { CategoryModel } from '../../models/Categorymodel.js';

export const createShop = async (req, res) => {
	try {
		console.log('callllll');
		console.log('reqqqqqqqqqqqqqqqqqqqqqqqqq', req.body);
		console.log('reqqqqq', req.file);

		const { shopName, shopDescription, ownerName, userName, password, category, email, location, contactNumber } =
			req.body;
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		let image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);

		const response = await ShopModel.create({
			shopName: shopName,
			shopDescription: shopDescription,
			ownerName: ownerName,
			userName: userName,
			image: image,
			password: hash,
			email_Id: email,
			location: location,
			contactNumber: contactNumber,
			category: category,
		});
		console.log('res::::', response);
		return res.status(200).json({
			success: true,
			message: 'Created Successfull!',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
export const updateShop = async (req, res) => {
	try {
		const shopId = req.params.id;
		const { shopName, category, ownerName, email_Id, location, contactNumber } = req.body;

		let image = req.body.image;
		if (req.file) {
			image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
		}

		const dataToUpdate = await ShopModel.findById({ _id: shopId });

		dataToUpdate.shopName = shopName;
		dataToUpdate.image = image;
		dataToUpdate.ownerName = ownerName;
		dataToUpdate.email_Id = email_Id;
		dataToUpdate.location = location;
		dataToUpdate.contactNumber = contactNumber;
		dataToUpdate.category = category;

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
export const deleteShop = async (req, res) => {
	try {
		const ShopId = req.params.id;
		const shop = await ShopModel.findById({ _id: ShopId });

		shop.deletedAt = dayjs();

		shop.save();

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
export const viewShop = async (req, res) => {
	try {
		const shopId = req.params.id;
		const shop = (
			await ShopModel.aggregate([
				{
					$match: {
						_id: new mongoose.Types.ObjectId(shopId),
						deletedAt: null,
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
					$lookup: {
						from: CategoryModel.modelName,
						localField: 'category',
						foreignField: '_id',
						as: 'categories',
					},
				},
				{
					$unwind: {
						path: '$categories',
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
						locations: 1,
						categories: 1,
						contactNumber: 1,
						image: 1,
					},
				},
			])
		).at(0);
		console.log('data::', shop);
		return res.status(200).json({
			success: true,
			message: 'Fetched',
			data: { shop: shop },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
export const getAllShop = async (req, res) => {
	try {
		const shops = await ShopModel.aggregate([
			{
				$match: {
					deletedAt: null,
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
				$lookup: {
					from: CategoryModel.modelName,
					localField: 'category',
					foreignField: '_id',
					as: 'categories',
				},
			},
			{
				$unwind: {
					path: '$categories',
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
					password: 1,
					image: 1,
				},
			},
		]);

		// console.log('data:::', shops);

		return res.status(200).json({
			success: true,
			message: 'Sucessfull',
			data: { shops: shops },
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};

export const shopAuthentication = async (req, res, next) => {
	try {
		const reqUserName = req.body.email;
		const reqPassword = req.body.password;

		const user = await ShopModel.findOne({ email_Id: reqUserName });

		if (!user) {
			return res.status(200).json({
				success: false,
				message: 'Authentication failed. User not found.',
			});
		}

		const isPasswordValid = bcrypt.compareSync(reqPassword, user.password);

		if (!isPasswordValid) {
			return res.status(200).json({
				success: false,
				message: 'Authentication failed. Invalid password.',
			});
		}

		const accessToken = jwt.sign({ userId: user._id }, env.SHOP_JWT_SECRET_KEY, { expiresIn: env.JWT_EXPIRES });
		const userData = { email: user.email_Id };

		return res.status(200).json({
			success: true,
			message: 'Login Successfull',
			accessToken,
			userData,
		});
	} catch (err) {
		console.log('Error::', err);
	}
};
export const featuredShop = async (req, res, next) => {
	try {
		const shopId = req.params.id;
		const shop = await ShopModel.findOne({ _id: shopId });
		if (!shop) {
			return res.status(422).json({
				success: false,
				message: 'shop not found',
			});
		}
		shop.featured = shop.featured === true ? false : true;
		await shop.save();

		res.status(200).json({
			success: true,
			message: shop.featured ? 'shop is Featured' : ' shop is not Featured',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
