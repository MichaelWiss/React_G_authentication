const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define our model
const userSchema = new Schema({
     email: String,
     password: String
});

//create model class


//export the model