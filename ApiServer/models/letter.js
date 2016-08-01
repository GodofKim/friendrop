const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const letterSchema = new Schema({
  host: Schema.ObjectId,
  email: String,
  content: String,
  date: Date
});


// Create the model class
//이름을 model로 하면 국소적인거고 이렇게 하면 모든 유저를 위한거??
const ModelClass = mongoose.model('letter', letterSchema);//몽구스야 user (콜렉션이름)을 위한 스키마야!

// Export the model
module.exports = ModelClass;
