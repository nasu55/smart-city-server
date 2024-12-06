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
