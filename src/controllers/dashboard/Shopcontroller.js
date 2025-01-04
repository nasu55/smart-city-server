import { ShopModel } from "../../models/ShopModel.js";
export const createShop = async(req, res) => {
try{
    console.log(req.body)
    const { shopName, ownerName, userName, password, email_Id, address,contactNumber } = req.body;
    await ShopModel.create({
        shopName: shopName,
        ownerName: ownerName,
        userName: userName,
        password: password,
        email_Id: email_Id,
        address: address,
        contactNumber: contactNumber,
    });
    return res.status(200).json({
        success: true,
        message: 'Created Successfull!',
    });
} catch (error){
    console.log(error)
    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
}
export const updateShop = async (req, res) => {
    try{
        const shopId = req.params.id;
console.log(req.body)
        const { shopName, ownerName, userName, password, email_Id, address,contactNumber  } = req.body;
        const dataToUpdate = await ShopModel.findById({_id:shopId})

        dataToUpdate.shopName = shopName;
        dataToUpdate.ownerName = ownerName;
        dataToUpdate.userName = userName;
        dataToUpdate.password = password;
        dataToUpdate.email_Id = email_Id;
        dataToUpdate.address = address;
        dataToUpdate.contactNumber = contactNumber;
        await dataToUpdate.save();
        return res.status(200).json({
            success: true,
            message: 'Updated',
        });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
};
export const deleteShop = async (req, res) => {
    try{
        const ShopId =req.params.id;
        await ShopModel.findByIdAndDelete({_id:ShopId});
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
        const shop = await ShopModel.findById({_id:shopId});
        return res.status(200).json({
            success: true,
            message: 'Fetched',
            data: { shop: shop },
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