import { CartModel } from "../../models/CartModel.js";

export const createCart = async(req, res) => {
try{
    const  {userId}  = req.user
    const {productId,quantity} = req.body
    await CartModel.create({
            
        userId: userId,
        productId:productId,
        quantity: quantity

       
    });
    return res.status(200).json({
        success: true,
        message: 'Created Successfull!',
    });
} catch (error){
    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
}