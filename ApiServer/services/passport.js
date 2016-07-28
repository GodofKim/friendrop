const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// Create local Strategy 원래 username 프로퍼티를 을 불러오기 때문에 이메일로 가져 오라고 변경
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  //Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  User.findOne({email: email},function(err,user){
    if (err) { return done(err);}
    if (!user) { return done(null,false);}

    //compare passwords - is 'password' equal to user.password? -> hashed!
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err);}
      if(!isMatch) { return done(null,false)}

      return done(null, user);
    })
  });
});
// Setup options for JWT Strategy
// 토큰을 어디서 찾아야할지(만들지?는 아니겠지), 시크릿 키
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user id in the payload exists in our database
  // If it does, call 'done' with that other
  //otherwise, call 'done' without a user object

  //Id가 데이터베이스의 도큐먼트마다 자동으로 생기는 건 알고 있겠지.
  User.findById(payload.sub, function(err, user){
    if(err) { return done(err, false)}

    if (user) {
      done(null, user);
    }else {
      done(null, false);
    }
  });

});

// Tel passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
