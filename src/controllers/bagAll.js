// bagController.js
const Bag = require('../models/Bag');
const User = require('../models/User');

const bagAll = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ error: 'No user ID provided' });
        }

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        const bags = await Bag.find({ user: id });
        return res.json(bags);
    } catch (err) {
        console.error('Error fetching bags:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
const addToBag = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate required fields
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: 'Incomplete information provided' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new bag item
        const newBagItem = new Bag({
            user: userId,
            product: productId,
            quantity: quantity,
        });

        // Save the bag item to the database
        await newBagItem.save();

        return res.status(201).json({ message: 'Item added to bag successfully' });
    } catch (err) {
        console.error('Error adding item to bag:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
module.exports = {
    bagAll,
    addToBag,
};
