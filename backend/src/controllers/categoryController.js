const categoryModel = require('../models/category-model');

exports.createCategory = async (req, res) => {
    try {
        const { image, categoryName, label } = req.body;
        if (!image || !categoryName || !label) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const categoryExist = await categoryModel.findOne({ categoryName });
        if (categoryExist) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const createdCategory = await categoryModel.create({ image, categoryName, label });
        return res.status(201).json({ message: "Category created successfully", category: createdCategory });
    } catch (error) {
        console.error("Category Creation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { id, categoryName, label, image } = req.body;
        if (!id) return res.status(400).json({ message: "Category ID is required" });

        const existingCategory = await categoryModel.findById(id);
        if (!existingCategory) return res.status(404).json({ message: "Category not found" });

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id, 
            { categoryName, label, image }, 
            { new: true }
        );
        return res.status(200).json({ message: "Category updated successfully", category: updatedCategory });

    } catch (error) {
        console.error("Category Update Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const allCategories = await categoryModel.find();
        return res.status(200).json({ categories: allCategories });
    } catch (error) {
        console.error("Category Fetch Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Category ID is required" });

        const existingCategory = await categoryModel.findById(id);
        if (!existingCategory) return res.status(404).json({ message: "Category not found" });

        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Category deleted successfully", category: deletedCategory });

    } catch (error) {
        console.error("Category Delete Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}