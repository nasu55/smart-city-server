import { ShopModel } from "../../models/ShopModel.js";
import { CategoryModel } from "../../models/Categorymodel.js";


export const getAllCategories = async (req, res) => {
    try{
        const categories = await CategoryModel.find();
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
export const getAllShops = async (req, res) => {
    try{
        const shops = await ShopModel.find({featured:true});
        return res.status(200).json({
            success: true,
            message: 'Sucessfull',
            data:{shops:shops}
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};