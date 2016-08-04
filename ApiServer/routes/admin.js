var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Drop = require('../models/drop');

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

router.post('/send-drop',function (req, res, next){
  console.log(req.body);
  const receiver = req.body.email;
  const senderEmail = req.body.senderEmail;

  const data = {};
  data.date = Date.now(); // new Date.now() 가 아니라 그냥 Date.now(). 생각해보니 그러네 클래스의 메소드지 인스턴스의 메소드가 아니잖아
  data.host = receiver;
  data.email = senderEmail;



  User.findOne( {email: receiver}, function(err, user){
    if(err) {
      res.redirect('/admin/db', {message: 'no one matches.'});
      throw err;
    }

    const drop = new Drop({
      host: user._id, // 아오 host는 이메일이 아니라 오브젝트 아이디였지
      email: data.email,
      date: data.date
    });

    drop.save(function(err){
      if (err) { return next(err);}

      res.redirect('/admin/db');
    });
/*
    User.findByIdAndUpdate(
          user._id,
          {$push: {"drops": data}},
          {safe: true, upsert: true, new : true}, //new는 없으면 배열 새로 만들라는 거.
          function(err, model) {
              console.log(err);

              res.redirect('/admin');
          }
      );
*/
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
