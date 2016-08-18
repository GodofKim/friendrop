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

  User.findOne( {email: req.body.senderEmail}, (err, sender) => {
    if(!sender){
      res.render('dbpage',{message_letter: '보낼 사람의 정보가 없습니다.'});
    }else{
      User.findOne( {email: receiver}, function(err, user){
        if(err) { throw err;  }

        if(!user) {
          res.render('dbpage',{message_contact: '받을 사람의 정보가 없습니다.'});
        }
        else {
          const letter = new Letter({
            host: user._id,
            email: req.body.senderEmail,
            content: req.body.content,
            date: Date.now()
          });

          letter.save(function (err) {
            if (err) {
              return next(err);
            }

            res.render('dbpage',{message_contact: '성공적으로 보냈습니다!'});
          });
        }
      });
    }
  });
});

router.post ('/send-contact', function(req, res, next) {
  const receiver = req.body.email;

  User.findOne( {email: req.body.senderEmail}, (err, sender) => {
    if(!sender){
      res.render('dbpage',{message_contact: '보낼 사람의 정보가 없습니다.'});
    }
    else{
      User.findOne( {email: receiver}, function(err, user){
        if(err) { throw err;}

        if(!user) {
          res.render('dbpage',{message_contact: '받을 사람의 정보가 없습니다.'});
        }
        else{
          const contact = new Contact({
            host: user._id,
            email: req.body.senderEmail,
            date: Date.now()
          });

          contact.save(function (err) {
            if (err) {
              return next(err);
            }
            res.render('dbpage',{message_contact: '성공적으로 보냈습니다!'});
          });
        }

      });
    }
  });
});

router.post('/send-drop',function (req, res, next){
  const receiver = req.body.email;

  User.findOne({email: req.body.senderEmail},function(err, doc){
    // handle data
    if(err) throw err;
    // find 에서 찾는 문서가 없는 것은 Error 가 아니라 그냥 null 이다. 주의.
    if(doc){
      User.findOne({email: receiver}, function(err, user) {
        if(err) throw err;

        if(user){
          const drop = new Drop({
            host: user._id,
            email: req.body.senderEmail,
            date: Date.now() // new Date.now()가 아니지. 인스턴스로 부터 가져오는 게 아니니까.
          });
          // 데이터베이스에 저장.
          drop.save((err) => {
            if (err) { return next(err);}
            res.render('dbpage',{message_contact: '성공적으로 보냈습니다!'});
          });

        }else{
          res.render('dbpage', {message_drop: '받을 사람의 정보가 없습니다.'});
        }
      });
    }else{
      res.render('dbpage', {message_drop: '보낼 사람의 정보가 없습니다.'});
    }
  });

});


module.exports = router;
