import { UserModel } from '../../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../../env.js';

export const createUser = async (req, res, next) => {
	try {

	// console.log('calleddddddddd')


		const { name, email, contact, password } = req.body;

	// console.log('reqqq',req.body)
	// console.log('reqqq',contact)

		const salt = bcrypt.genSaltSync(10);
		// console.log('saltt',salt)
		const hash = bcrypt.hashSync(password, salt);
		// console.log('saltt',hash)

		// const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new UserModel({
			password: hash,
			email: email,
			contact: contact,
			name: name,
			

		});
		await newUser.save();
		console.log('user',newUser)
		return res.status(200).send('User has been created!');
	} catch (err) {
		console.log("errorr:::",err);
		return res.status(400).json({
			success: false,
			message: 'Login failed',
		})
	}
};
export const userLogin = async (req, res, next) => {
	try {
		const reqEmail = req.body.email.trim();
		const reqPassword = req.body.password.trim();
		const user = await UserModel.findOne({ email: reqEmail });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Authentication failed. User not found.',
			});
		}

		const isPasswordValid = bcrypt.compareSync(reqPassword, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: 'Authentication failed. Invalid password.',
			});
		}

		const accessToken = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, { expiresIn: env.JWT_EXPIRES });
		const userDatas = await UserModel.aggregate([
			{
				$match:
				{
					email:user.email
				},
			},
			{
				$project:
				{
					_id:1,
					name:1,
					email:1,
					contact:1,
					
				}
			}
		])

		const contact = userDatas[0].contact.toString()
		const userData = {
			contact : contact,
			name :userDatas[0].name,
			email:userDatas[0].email,
			_id:userDatas[0]._id,
		}


		return res.status(200).json({
			success: true,
			message: 'Login Successfull',
			data:{userData : userData,accessToken:accessToken  }
			,
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			success: false,
			message: 'Login failed',
		})
	}
};


export const getAllUser = async (req, res) => {
	try {
		const users = await UserModel.find();
		return res.status(200).json({
			success: false,
			message: 'Server error',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
