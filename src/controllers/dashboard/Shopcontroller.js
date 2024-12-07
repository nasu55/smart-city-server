import { ShopModel } from "../../models/ShopModel";
export const createShop = async(req, res) => {
try{
    const { category_id, username, password, email_id } = req.body;
    await ShopModel.create({
        category_id: category_id,
        username: username,
        password: password,
        email_id: email_id,
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
export const updateShop = async (req, res) => {
    try{
        const productId = req.params.id;
        const { category_id, username, password, email_id } = req.body;
        const dataToUpdate = await TestModel.findById(productId)

        dataToUpdate.category_id = category_id;
        dataToUpdate.username = username;
        dataToUpdate.password = password;
        dataToUpdate.email_id = email_id;
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
export const deleteShop = async (req, res) => {
    try{
        const ShopId =req.params.id;
        await TestModel.findByIdAndDelete(ShopId);
        return res.status(200).json({
            success: true,
            message: 'Deleted',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
export const viewShop = async (req, res) => {
    try{
        const shopId = req.params.id;
        const shop = await TestModel.findById(shopId);
        return res.status(200).json({
            success: true,
            message: 'Fetched',
            data: { product: product },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
export const getAllShop = async (req, res) => {
    try{
        const shops = awaits ShopModel.find();
        return res.status(200).json({
            success: false,
            message: 'Server error',
        });
    }
};