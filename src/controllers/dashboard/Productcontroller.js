import { ProductModel } from "../../models/ProductModel.js";
import path from 'path';

export const createProduct = async(req, res) => {
try{
    const { productName, description, mrp, price } = req.body;
console.log(req.body)
    let image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);

    await ProductModel.create({
        productName: productName,
        image: image,
        description: description,
        price:price,
        mrp:mrp,
        
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
export const updateProduct = async (req, res) => {
    try{
        const productId = req.params.id;
console.log(req.body)
        const { productName, description, mrp, price  } = req.body;
let image = req.body.image;
         image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);

        const dataToUpdate = await ProductModel.findById({_id:productId})

        dataToUpdate.productName = productName;
        dataToUpdate.image = image;
        dataToUpdate.description = description;
        dataToUpdate.price = price;
        dataToUpdate.mrp = mrp;
        
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
export const deleteProduct = async (req, res) => {
    try{
        const productId =req.params.id;
        await ProductModel.findByIdAndDelete({_id:productId});
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
export const viewProduct = async (req, res) => {
    try{
        const productId = req.params.id;
        const product = await ProductModel.findById({_id:productId});
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
export const getAllProduct = async (req, res) => {
    try{
        const products = await ProductModel.find();
        return res.status(200).json({
            success: true,
            message: 'Successful',
            data:{products:products}
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

