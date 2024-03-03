const LatestVisited = require('../models/LatestVisited');
const User = require('../models/User');

const listVisited = async (req, res) => {
    try {
        console.log(req.params);
        const userId = req.params.id;
        const user = await User.findById(userId);
        console.log(userId, user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const latestItems = await LatestVisited.find({ user: user._id })
            .populate('product')
            .sort({ timestamp: -1 })
            .limit(10);

        if (latestItems.length > 0) {
            res.json({ latestItems });
        } else {
            res.json({ message: 'No recent visits' });
        }
    } catch (error) {
        console.error('Error fetching latest visited items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addLisitedVisit = async (req, res) => {
    try {
        const { user, product, timestamp } = req.body;
        console.log(user,product,timestamp);
        if (!user || !product) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        const userconsist = await User.findById(user);
        if (!userconsist) {
            return res.status(404).json({ error: "User doesn't exists" });
        }
        const existingVisit = await LatestVisited.findOne({ user: user, product: product });

        if (existingVisit) {
            // Update the timestamp of the existing record
            existingVisit.timestamp = timestamp;
            await existingVisit.save();

            return res.status(200).json(existingVisit);
        }
        const newlisitedvisit = new LatestVisited({
            user: user,
            product: product,
            timestamp: timestamp,
        });
        await newlisitedvisit.save();
        return res.status(201).json(newlisitedvisit);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};
module.exports = {
    listVisited,
    addLisitedVisit,
};
