import { ShopModel } from "../../models/ShopModel.js";
import path from 'path';

export const createShop = async(req, res) => {
try{
    const { shopName,shopDescription, ownerName, userName, password, email_Id, address,contactNumber } = req.body;

    let image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);

    await ShopModel.create({
        shopName: shopName,
        shopDescription: shopDescription,
        ownerName: ownerName,
        userName: userName,
        image:image,
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
let image = req.body.image;
         image = 'uploads' + req.file?.path.split(path.sep + 'uploads').at(1);

        const dataToUpdate = await ShopModel.findById({_id:shopId})

        dataToUpdate.shopName = shopName;
        dataToUpdate.image = image;
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

export const shopAuthentication = async (req, res, next) => {
	try {
		const reqUserName = req.body.userName;
		const reqPassword = req.body.password;

		const user = await ShopModel.findOne({ userName: reqUserName });

		if (!user) {
			return res.status(200).json({
				success: false,
				message: 'Authentication failed. User not found.',
			});
		}

	
        const isPasswordValid = await ShopModel.findOne({ password: reqPassword });
		// const isPasswordValid = bcrypt.compareSync(reqPassword, user.password);

		if (!isPasswordValid) {
			return res.status(200).json({
				success: false,
				message: 'Authentication failed. Invalid password.',
			});
		}

		// const accessToken = jwt.sign({ userId: user._id }, env.SHOP_JWT_SECRET_KEY, { expiresIn: env.JWT_EXPIRES });
		// const userData = { email: user.email,  };

		return res.status(200).json({
			success: true,
			message:'Login Successfull',
			// accessToken,
			// userData,
		});
	} catch (err) {
		
		console.log('Error::',err)
	}
};