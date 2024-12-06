export const createData = async(req, res) => {
try{
    const { category_id, username, password, email_id } = req.body;
    await StaffModel.create({
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
export const updateData = async (req, res) => {
    try{
        const productId = req.params.id;
        const { name, description } = req.body;
        const dataToUpdate = await TestModel.findById(productId)
        dataToUpdate.name = name;
        dataToUpdate.description = description;
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
export const deleteData = async (req, res) => {
    try{
        const productId =req.params.id;
        await TestModel.findByIdAndDelete(productId);
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
export const viewData = async (req, res) => {
    try{
        const productId = req.params.id;
        const product = await TestModel.findById(productId);
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
export const getAllData = async (req, res) => {
    try{
        const products = awaits TestModel.find();
        return res.status(200).json({
            success: false,
            message: 'Server error',
        });
    }
};