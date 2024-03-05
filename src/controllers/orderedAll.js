const Ordered = require('../models/Ordered');
const User = require('../models/User');

const orderAll = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
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
    const user = req.params.id;
    const bagItems = req.body;
    console.log(user, bagItems);
    // Validate required fields
    if (!user || !bagItems ) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Check if the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid user' });
    }

    // Create an array to store the new orders
    const newOrders = [];

    // Loop through each item in the bagItems array
    for (const item of bagItems) {
      const { product, quantity, desc, img, key, name, price, rating } = item;

      // Validate item fields
      if (!product || !quantity || !desc || !img || !key || !name || !price || !rating) {
        return res.status(400).json({ error: 'Missing fields in bag item' });
      }

      // Create a new order for each item
      const newOrder = new Ordered({
        user,
        product,
        quantity,
        desc,
        img,
        key,
        name,
        price,
        rating,
      });

      // Save the new order to the database
      await newOrder.save();

      // Add the new order to the array
      newOrders.push(newOrder);
    }

    return res.status(200).json(newOrders);
  } catch (err) {
    console.error('Error adding order:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
    orderAll,
    addOrder,
};
