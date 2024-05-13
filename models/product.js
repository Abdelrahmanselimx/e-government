const mongoose = require("mongoose");
const Subcategory = require('./subcategory');


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);