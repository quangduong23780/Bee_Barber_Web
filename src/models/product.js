const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"CategoryProduct"
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    import_price: {
        type: Number,
        required: true
    },
    price_selling: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    quantity:{
        type:Number,
        required: true
    }
});

const Product = mongoose.model('Product', productShema);

module.exports = Product;