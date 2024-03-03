// Users model having name , email and password

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
module.exports = mongoose.model('User', userSchema);

