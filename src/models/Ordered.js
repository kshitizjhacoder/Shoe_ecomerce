const mongoose =  require('mongoose');
const orderedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true,min:1 },
    date: { type: Date, default: Date.now }, // Include default value for current date
}, { timestamps: true });

module.exports = mongoose.model('Ordered', orderedSchema);
