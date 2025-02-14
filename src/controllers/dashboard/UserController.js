import { UserModel } from '../../models/UserModel.js';

export const getAllUsers = async (req, res) => {
	try {
		const users = await UserModel.aggregate([
			{
				$match: {
					deletedAt: null,
				},
			},
			{
				$project: {
					name: 1,
					contact: 1,
					email:1,
				},
			},
		]);

		res.status(200).json({
			success: true,
			message: 'Users Fetched Successfully',
			data: {
				users: users,
			},
		});
	} catch (error) {
        console.log('err',error)
        return res.status(500).json({
			success: false,
			message: 'Server error',
		});
    }
};
