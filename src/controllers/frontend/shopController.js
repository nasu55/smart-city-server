import { ShopModel } from "../../models/ShopModel.js";

export const getAllShops = async (req, res) => {
    try{
        const shops = await ShopModel.find();
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