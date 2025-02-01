// import { BannerModel } from "../../models/BannerModel.js";
// import path from 'path';
// import { FoodModel } from "../../models/FoodModel.js";
// import { CategoryModel } from "../../models/CategoryModel.js";


// export const createBanner = async(req, res) => {
//  try { 

//      const { category,food } = req.body;

//          let image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
     
//      await BannerModel.create({
//         categoryId: category,
//         foodId: food,
//         bannerImage: image,
//      });

//      return res.status(200).json({
//         success: true,
//         message: 'Created Successfully!',
//      });
//  } catch (error){
//     return res.status(500).json({
//         success: false,
//         message: error.message,
//     });
//  }
// };

// export const updateBanner = async (req, res) => {
//    try {

//       const category_id = req.params.id;
//       const { category,food } = req.body;      
//       const dataToUpdate = await BannerModel.findById({_id:category_id});
// let image = dataToUpdate.bannerImage
//        image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);
// console.log(req.file)
// console.log(req.files)

//       dataToUpdate.categoryId = category;
//       dataToUpdate.foodId = food;
//       dataToUpdate.bannerImage = image;

//       await dataToUpdate.save();
//       return res.status(200).json({
//          success: true,
//          message: 'Updated'
//       });


//    } catch (error){
//       console.log(error)
//       return res.status(500).json({
//          success: false,
//          message: 'Server error'
//       });
//    }

// };


// export const deleteBanner = async (req, res) => {
//    try {
//       const category_id = req.params.id;
      

//        await BannerModel.findByIdAndDelete(category_id);


//       return res.status(200).json({
//          success: false,
//          message: 'Deleted'
//       });


//    } catch (error){
//       return res.status(500).json({
//          success: false,
//          message: 'Server error'
//       });
//    }

// };

// export const viewBanner = async (req, res) => {
//    try {
//        const category_id = req.params.id;

//        const category = await BannerModel.findById({_id:category_id});

//        return res.status(200).json({
//            success: true,
//            message: 'Fetched',
//            data: { banner: category},
//        });
//    }   catch (error) {
//        return res.status(500).json({
//            success: false,
//            message: 'server error',
//        });
//    }
// };

// export const getAllBanner = async (req, res) => {
//    try {
//     const category = await BannerModel.aggregate([
// {
//    $lookup:{
//       from:FoodModel.modelName,
//       localField:'foodId',
//       foreignField:'_id',
//       as:'food'
//    }
// },{
//    $unwind:'$food'
// },

//          {
//             $project: {
//                foodName: '$food.foodName',
//                price: 1,
//                bannerImage:1,
//                category: '$category.categoryName'
//             }
//          }
//       ]);
//        return res.status(200).json({
//            success: true,
//            message: 'All Data Fetched',
//            data: { banners: category},
//        });
//    } catch (error) {
//        return res.status(500).json({
//            success: false,
//            message: 'server error',
//        });
//    }
// };