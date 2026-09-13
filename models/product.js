import mongoose from "mongoose";


const variantSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            required: true,
            trim: true
        },

        color: {
            type: String,
            required: true,
            trim: true
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        sku: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        _id: true
    }
);


const productSchema = new mongoose.Schema(
    {
        productID: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        altNames: {
            type: [String],
            default: []
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        images: {
            type: [String],
            default: []
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        labelledPrice: {
            type: Number,
            required: true,
            min: 0
        },

        category: {
            type: String,
            required: true,
            enum: [
                "T-Shirts",
                "Shirts",
                "Pants",
                "Jeans",
                "Shorts",
                "Dresses",
                "Skirts",
                "Jackets",
                "Hoodies",
                "Sweaters",
                "Accessories"
            ]
        },

        gender: {
            type: String,
            required: true,
            enum: [
                "Men",
                "Women",
                "Unisex",
                "Kids"
            ]
        },

        brand: {
            type: String,
            required: true,
            trim: true
        },

        material: {
            type: String,
            trim: true,
            default: ""
        },

        variants: {
            type: [variantSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);


const Product = mongoose.model(
    "Product",
    productSchema
);


export default Product;