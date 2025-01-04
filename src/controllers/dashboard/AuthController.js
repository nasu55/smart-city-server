import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthModel from '../../models/AuthModel.js';
import env from '../../../env.js';
export const postAuth = async (req, res,next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(env.ADMIN_PASSWORD, salt);

		// const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new AuthModel({
			password: hash,
			email: env.ADMIN_EMAIL,

			// email: req.body.email,
		});
		await newUser.save();
		return res.status(200).send('User has been created!');
	} catch (err) {
		console.log(err)
	}
};
export const postAuthentication = async (req, res, next) => {
	try {
		const reqEmail = req.body.email.trim();
		const reqPassword = req.body.password.trim();

		const user = await AuthModel.findOne({ email: reqEmail });

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
		const userData = { email: user.email,  };

		return res.status(200).json({
			success: true,
			message:'Login Successfull',
			accessToken,
			userData,
		});
	} catch (err) {
		
		console.log(err)
	}
};