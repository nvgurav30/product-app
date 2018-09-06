const mongoose = require("mongoose");

const productSchema = mongoose.Schema({    
    productName: { type: String, required: true},
    productCode: { type: String, required: true},
    releaseDate: { type: String},
    description: { type: String},
    price: { type: Number },
    starRating: { type: Number, default: 0 },
    imageUrl: { type: String, default: ''}
});

module.exports = mongoose.model('Product', productSchema);