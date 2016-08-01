const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');



const dropSchema = new Schema({ name: String, email: String, detail : { school: String, major: String }});
// Define our model
const userSchema = new Schema({
  email: { type:String, unique: true },
  //이 사람이 가르쳐주는 게 더 많네. unique!
  //대소문자를 따로 보기 때문에 애초에 소문자로 다 변환해서 저장하는 게 좋다.
  password: String,
  name: String,
  detail : { school: String, major: String },
  drops : [dropSchema]
});

// On Save Hook, encrypt password 세이브 할때 이것도 처리하라는 것 같군. -> pre니까 이걸 먼저.next 함수가 그럼 save하는 애인가 보네.
// Before saving a model, run this function
userSchema.pre('save', function(next){
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) { return next(err); }

      //overwrite plain text password with encrypted password.
      user.password = hash;
      next();
    });
  });
});

// user 객체를 새로 만들때 methods안에있는 메소드들을 호출한다.?? 접근할 수 있다?? 뭐지.
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) { return callback(err);}

    callback(null, isMatch);
  })
}
// Create the model class
//이름을 model로 하면 국소적인거고 이렇게 하면 모든 유저를 위한거??
const ModelClass = mongoose.model('user', userSchema);//몽구스야 user (콜렉션이름)을 위한 스키마야!

// Export the model
module.exports = ModelClass;
