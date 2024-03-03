//controllers/authentication.js
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const model = require('../models/User');

const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        if (!name || !email || !password) {
            console.log("Received Request Body:", req.body);
            console.log("Missing fields");
            return res.status(400).send({ body:req.body,error: 'Missing fields' });
        }
        const existing = await model.findOne({ email });

        if (existing) {
            console.log("Already exist");
            return res.sendStatus(404);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new model({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ userId: newUser._id }); // Send a status code indicating successful registration
    } catch (error) {
        return res.sendStatus(500);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await model.findOne({ email });

        if (!existingUser) {
            return res.sendStatus(404);
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.sendStatus(401);
        }

        // Optionally, generate and send a JWT token for authentication
        // const token = jwt.sign({ userId: existingUser._id }, 'your-secret-key', { expiresIn: '1h' });
        // res.json({ token });

        res.status(200).json({ userId: existingUser._id }); // Send a status code indicating successful login
    } catch (error) {
        return res.sendStatus(500);
    }
};

module.exports = {
    registration,
    login,
};
