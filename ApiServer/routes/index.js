var express = require('express');
var router = express.Router();
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session:false});

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

//AWS SDK
var AWS = require('aws-sdk');
AWS.config.update({
  signatureVersion: 'v4',
  accessKeyId: "AKIAIGPUKZE3YFIDLRZQ",
  secretAccessKey: "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"
});
const s3 = new AWS.S3();
const fs = require('fs');

const User = require('../models/user');
const Drop = require('../models/drop');
const Profile = require('../models/profile');
const Letter = require('../models/letter');
const Contact = require('../models/contact');


router.post('/signup', Authentication.signup);
// requireSignin이 req를 먼저 낚아채도록 이렇게 해준다??? 먼소리고
router.post('/signin', requireSignin, Authentication.signin);

// 앞으로 auth가 필요한 라우트로 갈때마다  requireAuth를 넣어주면 된다.
router.get('/', requireAuth , (req, res, next)=>{
  res.send({ message: "서버로부터 보내지는 메시지입니다."});
});

router.delete('/user', requireAuth, (req, res, next) => {

  Letter.remove({email: req.user.email}, (err)=> {
    if(err) throw err;
    Contact.remove({email: req.user.email}, (err)=> {
      if(err) throw err;
      Drop.remove({email: req.user.email}, (err)=> {
        if(err) throw err;
        Profile.remove({email: req.user.email}, (err)=> {
          if(err) throw err;
          User.remove({_id: req.user._id}, (err)=> {
            if(err) throw err;
            res.status(200);
            res.send();
          });
        });
      });
    });
  }); // 미친 콜백 지옥. 나중에 Promise나 Generator로 바꾸자
});

//임시 응답. 객체 배열 보냄.
router.get('/array', requireAuth, (req, res, next)=>{
  //왜 id로 찾으니까 안되냐. 아하. _id 니까 Id로 해야하는구나.
  User.findOne({email: req.user.email},function(err,user){
    if (err) throw err;
    //하 이것때문에 몇시간을 해맨 거야 ㅁㅊ
    const temp = JSON.parse(JSON.stringify(user));
    const profile = temp.drops;

    res.json({ drops: profile });
  });//req.user가 정보를 왜이리 많이 가지고 있지?? 이럴거면 그냥 프론트에서 다 처리해도 될정도.
  //그게 아니다 멍청아!! 패스포트의 jwt strategy가 토큰 확인할 때 데이터베이스 검색하는데, 그때 정상적인 경우
  //찾은 user을 req.user에 올려버려서 그런 거임. 그럼 이렇게 되면 실시간 반영은 안 되는 것인가. 실험해보자.
  //실험 안 해도 논리적으로 그럴 것 같은데. 차라리 패스포트가 간단한 정보만 리턴하게 할까? 아니다. 근데 어차피
  // 이 페이지로 요청할 할때만 정보를 가져오니까 차라리 패스포트가 가져온 정보를 이용하는 게 낫지 않나.
  // 아니다 아니야!!! 클라이언트가 몇초에 한번씩 계속 요청을 하도록 만드는 게 낫지 않을까. 이건 '웹사이트'가 아니라
  // '애플리케이션'이라고. => 그렇게 만들었다.
});



// Get Profile
router.get('/profile', requireAuth, (req, res, next) => {
    Profile.findOne({host: req.user._id}, (err, profile) => {

        var temp = JSON.parse(JSON.stringify(profile));
        res.json({profile: temp});
    });
});

// Get one's profile
router.get('/profile/:id', (req, res, next) => {
  // id는 일단 이메일로 하자
  Profile.findOne({email: req.params.id }, (err, profile) => {
    if(err) {throw err;}
    if(!profile){
      console.log("그런 사람 없습니다");
      res.status(404).send({error: 'Cannot find', email: req.params.id});
    }
    else {
      //나중에 프로필에서 지울 목록은 다 지우고 보내줘라.
      //사용자가 공개 거부한 것들.
      var temp = JSON.parse(JSON.stringify(profile));
      res.json({profile: temp});
    }
  });
});

// Edit Profile
router.post('/profile', requireAuth, (req, res, next)=> {

  Profile.update({host: req.user._id},
    {
      $set: {
        "name": req.body.name,
        "nickname": req.body.nickname,
        "school": req.body.school,
        "major": req.body.major,
        "phone" : req.body.phone
      }
    }, (err) => {
      if(err) {
        res.status(422).send({error: 'Edit Error'});
      }
      console.log("sfs");
      res.status(200);
      res.send();
    });
});

// Upload profileImage
router.post('/profile-image', requireAuth, upload.single('image'), (req,res)=>{
  console.log("Image upload request");
  console.log(req.user);
  console.log("req.files:",req.file);

  Profile.findOne({email: req.user.email},(err, profile)=>{
    if(err) throw err;
    if(!profile){
      console.log("Find Profile Failed");
      res.status(404).send("프로필이 없습니다.");
      return;
    }
    console.log("Found Profile");

    if(req.file){
      s3.upload({'Bucket':'friendrop',
        'Key':req.file.filename.toString(),
        'ACL':'public-read',
        'Body': fs.createReadStream(req.file.path),
        'ContentType':'image/png'},
        (err,data) => {
          if(err) throw err;
          fs.unlink(req.file.path);

          profile.update({$push : {image: req.file.filename}}, (err) => {
            if(err) next(err);
            console.log("Image Upload Success");

            res.status(200);
            res.send("Image Upload Success");
          });
      });
    }else{
      console.log("file doesn't exist.");
      res.send("file does't exist.");
    }

  });
});

// Send Drops
router.get('/drops', requireAuth, (req, res, next) => {
  Drop.find({host: req.user._id}, (err, drops) => {
    if(err) {
      console.log("error: /drops");
      throw err;
    }

    var fetchData = JSON.parse(JSON.stringify(drops));
    var sendArray = [];
    var times = fetchData.length;
    var i = 0;

    fetchData.forEach((drop) => {
      Profile.findOne({email: drop.email}, (err, profile) => {
        var fetchProfile = JSON.parse(JSON.stringify(profile));

        sendArray[i] = {
          _id: drop._id,
          email: fetchProfile.email,
          name: fetchProfile.name,
          nickname: fetchProfile.nickname,
          gender: fetchProfile.gender,
          school: fetchProfile.school,
          major: fetchProfile.major,
          date: drop.date
        };

        i ++;
        if( i == times ){
          res.json({drops: sendArray});
        }
      });
    });
  });
});

//Send Letters
router.get('/letters', requireAuth, (req, res, next) => {
  Letter.find({host: req.user._id}, (err, letters) => {
    if(err) return next(err);

    var fetchData = JSON.parse(JSON.stringify(letters));
    var sendArray = [];
    var times = fetchData.length;
    var i = 0;

    fetchData.forEach((letter) => {
      Profile.findOne({email: letter.email}, (err, profile) => {
        var fetchProfile = JSON.parse(JSON.stringify(profile));

        sendArray[i] = {
          _id: letter._id, // for iterate key. => 프로필 아이디가 아니라 쪽지 아이디여야 유니크하지.
          email: fetchProfile.email,
          name: fetchProfile.name,
          nickname: fetchProfile.nickname,
          content: letter.content,
          date: letter.date
        };

        i ++;
        if( i == times ){
          res.json({letters: sendArray}); // ---- 이 방법이 맘에들지 않는다면 요청/응답을 두번에 걸쳐서 하는 방법도 있다.
        }
      });
    });
  });
});

//Post Letter
router.post ('/letter', requireAuth, function (req, res, next) {
  const receiver = req.body.receiver;
  const content = req.body.content;

  User.findOne({email: receiver}, (err, receiver) => {
    if(err) { return next(err);}

    if(!receiver){
      res.status(404);
      res.send("Receiver not found");
    }else{
      const letter = new Letter({
        host: receiver._id,
        email: req.user.email, // 보낸 사람.
        content: content,
        date: Date.now()
      });

      letter.save((err) =>{
        if(err) { return next(err);}

        console.log('Letter sent!');
        res.status(200);
        res.send("sent!")
      });
    }
  });
});

// Send Contacts
router.get('/contacts', requireAuth, (req, res, next) => {
  Contact.find({host: req.user._id}, (err, contacts) => {
    if(err) throw err;

    var fetchData = JSON.parse(JSON.stringify(contacts));
    var sendArray = [];
    var times = fetchData.length;
    var i = 0;

    fetchData.forEach((contact) => {
      Profile.findOne({email: contact.email}, (err, profile) => {
        var fetchProfile = JSON.parse(JSON.stringify(profile));

        sendArray[i] = {
          _id: contact._id, // for iterate key. => 프로필 아이디가 아니라 연락처 아이디여야 유니크하지.
          email: fetchProfile.email,
          name: fetchProfile.name,
          nickname: fetchProfile.nickname,
          phone: fetchProfile.phone,
          date: contact.date
        };

        i ++;
        if( i == times ){
          res.json({contacts: sendArray});
        }
      });
    });
  });
});

//Post Contact
router.post ('/contact', requireAuth, function (req, res, next) {
  const receiver = req.body.receiver;

  User.findOne({email: receiver}, (err, receiver) => {
    if(err) { return next(err);}

    if(!receiver){
      res.status(404);
      res.send("Receiver not found");
    }else{
      const contact = new Contact({
        host: receiver._id,
        email: req.user.email, // 보낸 사람.
        date: Date.now()
      });

      Contact.findOne({ host: contact.host, email: contact.email}, (err, isExist) => {
        if(isExist){
          res.send("already exists."); // 일단 여기서 끝내고 나중에 클라이언트로 알림 뜨게 만들어라.
        }else{
          contact.save((err) =>{
            if(err) { return next(err);}

            console.log('contact sent!');
            res.status(200);
            res.send("sent!")
          });
        }
      });
    }
  });
});

module.exports = router;
