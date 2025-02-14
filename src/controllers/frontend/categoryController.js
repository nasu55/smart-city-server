import { CategoryModel } from "../../models/Categorymodel.js";


export const getAllCategories = async (req, res) => {
    try{
        console.log(
            'callll'
        )
        const categories = await CategoryModel.find({deletedAt:null});
        return res.status(200).json({
            success: true,
            message: 'Data Fetched Successfully',
            data:{categories:categories}
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};