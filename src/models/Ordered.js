const mongoose =  require('mongoose');
const orderedSchema = new mongoose.Schema({
    user:{type:String,required:true},
    desc: { type: String, required: true },
    img: { type: String, required: true },
    key: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: String, required: true },
    rating: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Include default value for current date
}, { timestamps: true });

module.exports = mongoose.model('Ordered', orderedSchema);
