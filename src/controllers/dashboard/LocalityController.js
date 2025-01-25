import dayjs from 'dayjs';
import { LocalityModel } from '../../models/LocalityModel.js';
import path from 'path';

export const createLocality = async (req, res) => {
	try {
		const { localityName } = req.body;
		await LocalityModel.create({
			localityName: localityName,
		});
		return res.status(200).json({
			success: true,
			message: 'Created Successfull!',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
export const updateLocality = async (req, res) => {
	try {
		const localityId = req.params.id;
		const { localityName } = req.body;

		const dataToUpdate = await LocalityModel.findById(localityId);

		dataToUpdate.localityName = localityName;
		await dataToUpdate.save();
		return res.status(200).json({
			success: true,
			message: 'Updated',
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
export const deleteLocality = async (req, res) => {
	try {
		const localityId = req.params.id;
		const location = await LocalityModel.findById(localityId);
		location.deletedAt = dayjs();
		location.save();
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
export const viewLocality = async (req, res) => {
	try {
		const localityId = req.params.id;
		const locality = await LocalityModel.findById(localityId);
		return res.status(200).json({
			success: true,
			message: 'Fetched',
			data: { locality: locality },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
export const getAllLocality = async (req, res) => {
	try {
		const localities = await LocalityModel.find({ deletedAt: null });
		return res.status(200).json({
			success: true,
			message: 'Server error',
			data: { localities: localities },
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Server error',
		});
	}
};
