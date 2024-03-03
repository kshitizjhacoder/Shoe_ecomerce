const Ordered = require('../models/Ordered');
const User = require('../models/User');

const orderAll = async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if no ID is provided
        if (!userId) {
            return res.status(400).json({ error: 'No ID provided' });
        }

        // Get the user from the database using their ID
        const foundUser = await User.findById(userId);

        // Check if user not found
        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find all orders for the user and sort by date in descending order
        const orderedAll = await Ordered.find({ user: userId }).sort({ date: 'desc' });

        // Return the ordered items
        return res.json(orderedAll);
    } catch (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const addOrder = async (req, res) => {
    try {
        const { user, product, quantity, time } = req.body;
        
        // Validate required fields
        if (!user || !product || !quantity || !time) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        // Check if the user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ error: 'Invalid user' });
        }

        // Check if an order already exists for the user and product
        const existingOrder = await Ordered.findOne({ user, product });

        if (existingOrder) {
            // If an order exists, increase the quantity
            existingOrder.quantity += 1;
            await existingOrder.save();
            return res.status(201).json(existingOrder);
        }

        // If no existing order, create a new one
        const newOrder = new Ordered({
            user,
            product,
            quantity,
            date: new Date(time),
        });
        
        await newOrder.save();
        return res.status(201).json(newOrder);
    } catch (err) {
        console.error('Error adding order:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    orderAll,
    addOrder,
};
