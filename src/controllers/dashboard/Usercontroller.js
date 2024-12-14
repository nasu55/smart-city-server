import { UserModel } from "../../models/UserModel.js";

export const createUser = async(req, res) => {
try{
    const {UserId, Username, Contact, Status, Password, Address, Email_Id, ContactNumber, DeletedAt } = req.body;
    await UserModel.create({
        UserId: UserId,
        Username: Username,
        Contact: Contact,
        Status: Status,
        Password: Password,
        Address: Address,
        Email_Id: Email_Id,
        ContactNumber: ContactNumber,
        DeletedAt: DeletedAt,
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
export const updateUser = async (req, res) => {
    try{
        const productId = req.params.id;
        const { UserId, Username, Contact, Status, Password, Address, Email_Id, ContactNumber, DeletedAt  } = req.body;
        const dataToUpdate = await TestModel.findById(UserId)

        dataToUpdate.UserId = UserId;
        dataToUpdate.Username = Username;
        dataToUpdate.Contact = Contact;
        dataToUpdate.Status = Status;
        dataToUpdate.Password = Password;
        dataToUpdate.Address = Address;
        dataToUpdate.Email_Id = Email_Id;
        dataToUpdate.ContactNumber = ContactNumber;
        dataToUpdate.DeletedAt = DeletedAt;
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
export const deleteUser = async (req, res) => {
    try{
        const UserId =req.params.id;
        await UserModel.findByIdAndDelete(UserId);
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
export const viewUser = async (req, res) => {
    try{
        const UserId = req.params.id;
        const User = await UserModel.findById(UserId);
        return res.status(200).json({
            success: true,
            message: 'Fetched',
            data: { User: User },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
export const getAllUser = async (req, res) => {
    try{
        const users = await UserModel.find();
        return res.status(200).json({
            success: false,
            message: 'Server error',
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
