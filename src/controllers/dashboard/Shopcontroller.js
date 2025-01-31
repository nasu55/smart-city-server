import { ShopModel } from '../../models/ShopModel.js';
import { LocalityModel } from '../../models/LocalityModel.js';
import path from 'path';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../../env.js';

export const createShop = async (req, res) => {
	try {
		const { shopName, shopDescription, ownerName, userName, password, email_Id, location, contactNumber } = req.body;
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		let image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);

		await ShopModel.create({
			shopName: shopName,
			shopDescription: shopDescription,
			ownerName: ownerName,
			userName: userName,
			image: image,
			password: hash,
			email_Id: email_Id,
			location: location,
			contactNumber: contactNumber,
		});
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
		console.log(req.body);
		const { shopName, ownerName, userName, password, email_Id, location, contactNumber } = req.body;


		let image = req.body.image;
		image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);

		const dataToUpdate = await ShopModel.findById({ _id: shopId });
        if(password){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            dataToUpdate.password = hash;
        }
		dataToUpdate.shopName = shopName;
		dataToUpdate.image = image;
		dataToUpdate.ownerName = ownerName;
		dataToUpdate.userName = userName;

		dataToUpdate.email_Id = email_Id;
		dataToUpdate.location = location;
		dataToUpdate.contactNumber = contactNumber;
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
		const shop = await ShopModel.findById({ _id: shopId });
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
                  localField: "location",
                  foreignField: "_id",
                  as: 'locations',
                },
              },
              {
                $unwind:{
                  path:'$locations',
                  preserveNullAndEmptyArrays:true
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
					contactNumber: 1,
					userName: 1,
					password: 1,
					image: 1,
				},
			},
		]);

		console.log('data:::', shops);

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
		const userData = { email: user.email_Id,  };

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
