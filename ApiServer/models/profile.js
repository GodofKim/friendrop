const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
  charactors: [String],
  appearances: [String],
  bloodgroup: String,
  location: String,
  alcohole: Number,
  religion: String,
  languages: [String],
  introduction: String
});

// Define our model
const profileSchema = new Schema({
  host: Schema.ObjectId,
  image: [String],
  name: String,
  nickname: String,
  gender: String,
  school: String,
  major: String,
  interests: [String],
  protected: [String],
  details: [detailSchema]
});


// Create the model class
//이름을 model로 하면 국소적인거고 이렇게 하면 모든 유저를 위한거??
const ModelClass = mongoose.model('profile', userSchema);//몽구스야 user (콜렉션이름)을 위한 스키마야!

// Export the model
module.exports = ModelClass;
