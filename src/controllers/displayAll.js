const Product = require('../models/Product');

const displayAll = async (req, res) => {
    try {
        // Use the singular form for the model name (Product) to be consistent with conventions
        let products = await Product.find();

        // Check if there are no products
        if (!products || products.length === 0) {
            return res.sendStatus(403); // Use res.sendStatus for sending status codes without a body
        }

        return res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        return res.sendStatus(500);
    }
};

module.exports = {
    displayAll,
};
