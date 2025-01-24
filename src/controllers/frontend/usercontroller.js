import { UserModel } from '../../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../../env.js';

export const createUser = async (req, res, next) => {
	try {
		console.log('called');
		const { userName, email, contact, password } = req.body;
		console.log("userName::::",userName);
		// if(password != confirm_password){
		//     return res.status(200).send('Password is not same as confirm password!');
		// }

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		// const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new UserModel({
			password: hash,
			email: email,
			contact: contact,
			userName: userName,
		});
		await newUser.save();
		return res.status(200).send('User has been created!');
	} catch (err) {
		console.log("errorr:::",err);
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
		const userData = { email: user.email };

		return res.status(200).json({
			success: true,
			message: 'Login Successfull',
			accessToken,
			userData,
		});
	} catch (err) {
		console.log(err);
	}
};
// export const updateUser = async (req, res) => {
//     try{
//         const productId = req.params.id;
//         const { Username, Contact, Email_Id, Password  } = req.body;
//         const dataToUpdate = await TestModel.findById(UserId)

//         dataToUpdate.Username = Username;
//         dataToUpdate.Contact = Contact;
//         dataToUpdate.Email_Id = Email_Id;
//         dataToUpdate.Password = Password;
//         await dataToUpdate.save();
//         return res.status(200).json({
//             success: true,
//             message: 'Updated',
//         });
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: 'Server error',
//             });
//         }
// };
// export const deleteUser = async (req, res) => {
//     try{
//         const UserId =req.params.id;
//         await UserModel.findByIdAndDelete(UserId);
//         return res.status(200).json({
//             success: true,
//             message: 'Deleted',
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// };
// export const viewUser = async (req, res) => {
//     try{
//         const UserId = req.params.id;
//         const User = await UserModel.findById(UserId);
//         return res.status(200).json({
//             success: true,
//             message: 'Fetched',
//             data: { User: User },
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Server error',
//         });
//     }
// };
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
// export const postAuthentication = async (req, res, next) => {
// 	try {
// 		const reqEmail = req.body.email.trim();
// 		const reqPassword = req.body.password.trim();

// 		const user = await UserModel.findOne({ email: reqEmail });

// 		if (!user) {
// 			return res.status(200).json({
// 				success: false,
// 				message: 'Authentication failed. User not found.',
// 			});
// 		}

// 		const isPasswordValid = await UserModel.findOne({ password: reqpassword });

// 		if (!isPasswordValid) {
// 			return res.status(200).json({
// 				success: false,
// 				message: 'Authentication failed. Invalid password.',
// 			});
// 		}

// 		// const accessToken = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, { expiresIn: env.JWT_EXPIRES });
// 		const userData = { email: user.email,_id:user._id  };

// 		return res.status(200).json({
// 			success: true,
// 			message:'Login Successfull',
// 			// accessToken,
// 			userData,
// 		});
// 	} catch (err) {

// 		console.log(err)
// 	}
// };
