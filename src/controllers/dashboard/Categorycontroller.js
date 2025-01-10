import { CategoryModel } from "../../models/Categorymodel.js";
import path from 'path';


export const createCategory = async(req, res) => {
try{
    const { categoryName } = req.body;
    let image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
    await CategoryModel.create({
        categoryName: categoryName,
        image:image,

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
export const updateCategory = async (req, res) => {
    try{
        const categoryId = req.params.id;
        const { categoryName } = req.body;
        let image = req.body.image;
                 image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
        
        const dataToUpdate = await CategoryModel.findById(categoryId)

        dataToUpdate.categoryName = categoryName;
        dataToUpdate.image = image;
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
export const deleteCategory = async (req, res) => {
    try{
        const categoryId =req.params.id;
        await CategoryModel.findByIdAndDelete(categoryId);
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
export const viewCategory = async (req, res) => {
    try{
        const categoryId = req.params.id;
        const category = await CategoryModel.findById(categoryId);
        return res.status(200).json({
            success: true,
            message: 'Fetched',
            data: { category: category },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
export const getAllCategory = async (req, res) => {
    try{
        const categories = await CategoryModel.find();
        return res.status(200).json({
            success: true,
            message: 'Server error',
            data:{categories:categories}
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};