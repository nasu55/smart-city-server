import mongoose from 'mongoose';

const localitySchema = new mongoose.Schema(
	{
		localityName: {
			type: String,
			required: true,
		},
		deletedAt: {
			type: Date,
			required: false,
            default: null
		},
	},
	{ timestamps: true },
);

export const LocalityModel = mongoose.model('localities', localitySchema);
