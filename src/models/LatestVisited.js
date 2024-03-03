// Change the model name to LatestVisited
const mongoose = require('mongoose');

const latestVisitedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    timestamp: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('LatestVisited', latestVisitedSchema);
