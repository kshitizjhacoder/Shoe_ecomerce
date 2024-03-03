// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/ProductRouter');
const orderRoutes = require('./routes/OrderRouter'); // Assuming you have order-related routes
const bagRoutes = require('./routes/BagRouter'); // Assuming you have bag-related routes
const latestVisitedRoutes = require('./routes/LatestVisitRouter'); // Assuming you have latest visited items routes
const authRoutes = require('./routes/AuthenticationRouter'); // Assuming you have authentication-related routes

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shoe_ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(bodyParser.json());
app.use(cors());


// Use routes
app.use('/home', productRoutes);
app.use('/orders', orderRoutes);
app.use('/bags', bagRoutes);
app.use('/home', latestVisitedRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
