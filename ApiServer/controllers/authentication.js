const jwt = require('jwt-simple');
const User = require('../models/user');
const Profile = require('../models/profile');
const config = require('../config');

function tokenForUser (user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next){
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user)});
}
exports.signup = function(req, res, next){
  //console.log(req.body.email);이렇게 확인해보는 게 공부에 도움이 많이 되겠군.
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error: 'You must provide email and password'});
  }
  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser){
    if(err) { return next(err);}

    // If a user with email does exist, return an error
    if(existingUser){
      return res.status(422).send({error: 'Email is in use'});
    }

    // If a user with email does NOT exist (중복 없음), create and save user record
    const user = new User({
      email: email,
      password: password
    });

    //save 이걸 하지 않으면 db에 저장이 안 됨. 일단 유저 도큐먼트 저장
    user.save(function(err){
      if (err) { return next(err);}

      // profile 도큐먼트 생성
      User.findOne({email: email}, (err, thisUser) => {
        if(err) { return next(err);}

        const profile = new Profile({
          host: thisUser._id,
          email: email
        });

        profile.save((err) => {
          if(err)  {return next(err);}

          // Respond to request indicating the user was created
          res.json({ token: tokenForUser(user)});
        });
      });

    });
  });
}
