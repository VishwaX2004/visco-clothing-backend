import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


export async function createProduct(req, res) {

    if (!isAdmin(req)) {

        return res.status(403).json({
            message: "You are not authorized to create a product"
        });
    }

    try {

        const productData = req.body;

        console.log(
            "Creating product:",
            productData
        );

        const product =
            new Product(productData);

        await product.save();

        return res.status(201).json({
            message: "Product Created Successfully",
            product
        });

    } catch (err) {

        console.error(
            "Create product error:",
            err
        );

        // Duplicate productID / SKU
        if (err.code === 11000) {

            return res.status(409).json({
                message:
                    "Product ID or SKU already exists.",
                error: err.message
            });
        }

        // Mongoose validation error
        if (err.name === "ValidationError") {

            return res.status(400).json({
                message:
                    "Product validation failed.",
                error: err.message
            });
        }

        return res.status(500).json({
            message:
                "Failed to Create Product",
            error:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : undefined
        });
    }
}


export async function getProducts(req, res) {

    try {

        const products =
            await Product.find()
                .sort({ createdAt: -1 });

        return res.status(200).json(
            products
        );

    } catch (err) {

        console.error(
            "Get products error:",
            err
        );

        return res.status(500).json({
            message:
                "Failed to retrieve products"
        });
    }
}


export async function deleteProduct(req, res) {

    if (!isAdmin(req)) {

        return res.status(403).json({
            message:
                "You are not authorized to delete a product"
        });
    }

    try {

        const productID =
            req.params.productID;

        if (!productID) {

            return res.status(400).json({
                message:
                    "Product ID is required"
            });
        }

        const result =
            await Product.deleteOne({
                productID: productID
            });

        if (result.deletedCount === 0) {

            return res.status(404).json({
                message:
                    "Product not found"
            });
        }

        return res.status(200).json({
            message:
                "Product Deleted Successfully"
        });

    } catch (err) {

        console.error(
            "Delete product error:",
            err
        );

        return res.status(500).json({
            message:
                "Failed to Delete Product"
        });
    }
}


export async function updateProduct(req, res) {

    if (!isAdmin(req)) {

        return res.status(403).json({
            message:
                "You are not authorized to update a product"
        });
    }

    try {

        const productID =
            req.params.productID;

        const updateData =
            req.body;

        if (!productID) {

            return res.status(400).json({
                message:
                    "Product ID is required"
            });
        }

        const product =
            await Product.findOneAndUpdate(
                {
                    productID: productID
                },
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!product) {

            return res.status(404).json({
                message:
                    "Product not found"
            });
        }

        return res.status(200).json({
            message:
                "Product Updated Successfully",
            product
        });

    } catch (err) {

        console.error(
            "Update product error:",
            err
        );

        if (err.code === 11000) {

            return res.status(409).json({
                message:
                    "Product ID or SKU already exists.",
                error: err.message
            });
        }

        if (err.name === "ValidationError") {

            return res.status(400).json({
                message:
                    "Product validation failed.",
                error: err.message
            });
        }

        return res.status(500).json({
            message:
                "Failed to Update Product"
        });
    }
}


export async function getProductByID(req, res) {

    try {

        const productID =
            req.params.productID;

        if (!productID) {

            return res.status(400).json({
                message:
                    "Product ID is required"
            });
        }

        const product =
            await Product.findOne({
                productID: productID
            });

        if (!product) {

            return res.status(404).json({
                message:
                    "Product not found"
            });
        }

        return res.status(200).json(
            product
        );

    } catch (err) {

        console.error(
            "Get product by ID error:",
            err
        );

        return res.status(500).json({
            message:
                "Failed to find product"
        });
    }
}