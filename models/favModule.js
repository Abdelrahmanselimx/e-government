const mongoose = require("mongoose");


const favModuleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
    
});

module.exports = mongoose.model('FavModule', favModuleSchema);
