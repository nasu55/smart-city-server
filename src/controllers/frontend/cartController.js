import { CartModel } from "../../models/CartModel.js";

export const createCart = async(req, res) => {
try{

    const {userId} = req.user
    const {productId,shopId, quantity} = req.body;

    await CartModel.create({
        userId: userId,
        shopId:shopId,
        productId: productId,
        quantity: quantity,
        
    });
    return res.status(200).json({
        success: true,
        message: 'Created Successful',
    });
} catch (error){
    console.log(error)
    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
}

export const getAllCarts = async (req, res) => {
    try{
        const {userId} = req.user
        const carts = await CartModel.find({userId:userId});
        return res.status(200).json({
            success: true,
            message: 'Data Fetched Successfully',
            data:{carts:carts}
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
export const deleteOne = async (req, res) => {
    try{
        const {userId} = req.user
        const {productId}= req.body
        const carts = await CartModel.deleteOne({userId:userId,productId:productId})

        return res.status(200).json({
            success: true,
            message: 'Deleted',
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
export const deleteMany = async (req, res) => {
    try{
        const {userId} = req.user
        const carts = await CartModel.deleteMany({userId:userId,})

        return res.status(200).json({
            success: true,
            message: 'Deleted',
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

export const quantityChange = async (req, res) => {
    try{
        const {userId} = req.user
        const {quantity,productId}= req.body
        const carts = await CartModel.find({userId:userId,productId:productId});

        carts.quantity = quantity;

        await carts.save();

        return res.status(200).json({
            success: true,
            message: 'Updated',
            data:{carts:carts}
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};