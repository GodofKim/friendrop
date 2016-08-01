var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/db',function (req, res, next) {
  res.render('dbpage');
});

router.get('/analytics', function(req, res, next){
  res.render('analytics');
});

router.get('/etc', function(req, res, next){
  res.render('etc');
});

router.post('/send',function (req, res, next){
  const email = req.body.email;
  const data = JSON.parse(req.body.data);

  User.findOne( {email: email}, function(err, user){
    if(err) {
      res.redirect('/admin/db',{ message: 'no one matches.'});
      throw err;
    }

    User.findByIdAndUpdate(
          user._id,
          {$push: {"drops": data}},
          {safe: true, upsert: true, new : true}, //new는 없으면 배열 새로 만들라는 거.
          function(err, model) {
              console.log(err);

              res.redirect('/admin');
          }
      );
  });
});

/*
router.post('/send', function (req, res, next){
  const email = res.body.email;
  const data = JSON.parse(req.body.data);

  User.findOne({email: email}, function(err, user){
    if(err) throw err;

    user.update({$push: { }})
  })
})*/

module.exports = router;
