const productModel = require('../models/product-model');

exports.createProduct = async (req, res) => {
    try {
        let { slug, title, image, price, oldPrice, category, brand, isNewArrival, isPopular, description, sizes, colors, material, fit, care } = req.body;

        if (!slug || !title || !image || !price || !category || !brand || !description || !sizes || !colors || !material || !fit || !care) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const existProduct = await productModel.findOne({ slug });
        if (existProduct) {
            return res.status(400).json({ message: "Product already exists." });
        }

        const product = await productModel.create({
            slug, title, image, price, oldPrice, category, brand,
            isNewArrival, isPopular, description, sizes, colors,
            material, fit, care
        });

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({ message: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const existProduct = await productModel.findById(id);
        if (!existProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        const updateProduct = {};
        for (let key in req.body) {
            updateProduct[key] = req.body[key];
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, updateProduct, { new: true });

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({ message: error.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error("Get All Products Error:", error);
        res.status(500).json({ message: error.message });
    }
}

exports.getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel.findOne({ slug });

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.error("Get Product By Slug Error:", error);
        res.status(500).json({ message: error.message });
    }
}