const mongoose = require('mongoose');
const bagSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true,min:1 },
});

module.exports = mongoose.model('Bag', bagSchema);