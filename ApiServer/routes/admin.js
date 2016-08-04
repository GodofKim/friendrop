var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Drop = require('../models/drop');
const Letter = require('../models/letter');
const Contact = require('../models/contact');


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

router.post ('/send-letter', function (req, res, next) {
  const receiver = req.body.email;

  User.findOne( {email: receiver}, function(err, user){
    if(err) {
      res.redirect('/admin/db', {message: 'no one matches.'});
      throw err;
    }

    const letter = new Letter({
      host: user._id,
      email: req.body.senderEmail,
      content: req.body.content,
      date: Date.now()
    });

    letter.save(function(err){
      if (err) { return next(err);}

      res.redirect('/admin/db');
    });
  });

});

router.post ('/send-contact', function(req, res, next) {
  const receiver = req.body.email;

  User.findOne( {email: receiver}, function(err, user){
    if(err) {
      res.redirect('/admin/db', {message: 'no one matches.'});
      throw err;
    }

    const contact = new Contact({
      host: user._id,
      email: req.body.senderEmail,
      date: Date.now()
    });

    contact.save(function(err){
      if (err) { return next(err);}

      res.redirect('/admin/db');
    });
  });
});

router.post('/send-drop',function (req, res, next){
  const receiver = req.body.email;

  const data = {};
  data.date = Date.now(); // new Date.now() 가 아니라 그냥 Date.now(). 생각해보니 그러네 클래스의 메소드지 인스턴스의 메소드가 아니잖아
  data.host = receiver;
  data.email = req.body.senderEmail;



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

  });
});


module.exports = router;
