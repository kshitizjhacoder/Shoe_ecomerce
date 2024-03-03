const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String },
    img: { type: String },
    price: { type: Number },
    rating: { type : String },
});

module.exports = mongoose.model('Product', productSchema); 