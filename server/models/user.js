const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema = new Schema({
     email: { type: String, unique: true, lowercase: true },
     password: String
});

//create model class
const ModelClass = mongoose.model('user', userSchema);


//export the model
module.exports = ModelClass;