// bagController.js
const Bag = require('../models/Bag');
const User = require('../models/User');

const bagAll = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'No user ID provided' });
        }

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        const bags = await Bag.find({ user: id });
        if (!bags) return res.status(404).json({ error: 'Bags are not yet present' });
        return res.status(200).json(bags);
    } catch (err) {
        console.error('Error fetching bags:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
const addToBag = async (req, res) => {
    // console.log(req.body);
    try {
        const { user, product, quantity } = req.body;

        // Validate required fields
        if (!user || !product || !quantity) {
            return res.status(400).json({ error: 'Incomplete information provided' });
        }

        // Check if the user exists
        const users = await User.findById(user);
        if (!users) {
            return res.status(404).json({ error: 'User not found' });
        }
        const existingItem = await Bag.findOne({ user, product });
        if (existingItem) {
            existingItem.quantity += Number(quantity);
            await existingItem.save();
            return res.status(200).json({ message: "Quantity increased" });
        }
        // Create a new bag item
        const newBagItem = new Bag({
            user: user,
            product: product,
            quantity: Number(quantity),
        });

        // Save the bag item to the database
        await newBagItem.save();

        return res.status(200).json({ message: 'Item added to bag successfully' });
    } catch (err) {
        console.error('Error adding item to bag:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};


const removeFromBag = async (req, res) => {
    const { id, itemid } = req.params;
    try {
        const result = await Bag.deleteOne({ product: itemid, user: id });
        if (!result.deletedCount) {
            return res.status(404).json({ error: 'No such item in your bag' });
        }
        return res.status(200).json({ message: 'An item is deleted' });
    } catch (err) {
        console.log('Error removing from bag', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateBagItem = async (req, res) => {
  const { id, itemid } = req.params;
  const { quantity } = req.body; // Assuming you want to update the quantity
//   console.log(itemid, id, quantity);
  try {
    const bagItem = await Bag.findOneAndUpdate(
      { user: id, product: itemid },
      { $set: { quantity: quantity } },
    );

    if (!bagItem) {
      return res.status(404).json({ error: 'No such item in your bag' });
    }

    return res.status(200).json({ message: 'Bag item updated successfully', updatedBagItem: bagItem });
  } catch (err) {
    console.log('Error updating bag item', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
    bagAll,
    addToBag,
    removeFromBag,
    updateBagItem
};
