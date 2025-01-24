import { ProductModel } from "../../models/ProductModel.js";


export const getAllProducts = async (req, res) => {
    try{
        const products = await ProductModel.find();
        return res.status(200).json({
            success: true,
            message: 'Data Fetched Successfully',
            data:{products:products}
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};