const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    oldPrice: {
        type: Number,
        default: null
    },

    rating: {
        type: Number,
        default: 0
    },

    reviewCount: {
        type: Number,
        default: 0
    },

    category: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    isNewArrival: {
        type: Boolean,
        required: true
    },

    isPopular: {
        type: Boolean,
        default: false
    },

    description: {
        type: String,
        required: true
    },

    sizes: {
        type: [String],
        required: true
    },

    colors: {
        type: [String],
        required: true
    },

    material: {
        type: String,
        required: true
    },

    fit: {
        type: String,
        required: true
    },

    care: {
        type: String,
        required: true
    }

}, { timestamps: true },);

productSchema.virtual('discount').get(function () {
    if (!this.oldPrice) return null;

    const discount = Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);

    return discount > 0 ? `${discount}% OFF` : null;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);