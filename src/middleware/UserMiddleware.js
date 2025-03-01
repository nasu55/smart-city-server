import jwt from "jsonwebtoken"
import env from "../../env.js";

export const authMiddleware = (req, res, next) => {
console.log('START')
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({
			success: false,
			message: 'Access token not found',
		});
	}


	try {
		const token = authHeader.split(' ')[1];

		const decodeData = jwt.verify(token, env.JWT_SECRET_KEY);



		if (!decodeData) {
			console.log("🚀 ~ authMiddleware ~ decodeData:")
			return res.status(401).json({
				success: false,
				message: 'Authentication failed.',
			});
		}
console.log('first')
		req.user = decodeData;
		next();
	} catch (error) {
		console.log('error',error)

	}
};