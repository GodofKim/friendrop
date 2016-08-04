var express = require('express');
var router = express.Router();
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session:false});

const User = require('../models/user');
const Drop = require('../models/drop');
const Profile = require('../models/profile');
const Letter = require('../models/letter');

router.post('/signup', Authentication.signup);
// requireSignin이 req를 먼저 낚아채도록 이렇게 해준다??? 먼소리고
router.post('/signin', requireSignin, Authentication.signin);

// 앞으로 auth가 필요한 라우트로 갈때마다  requireAuth를 넣어주면 된다.
router.get('/', requireAuth , (req, res, next)=>{
  res.send({ message: "서버로부터 보내지는 메시지입니다."});
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
  // '애플리케이션'이라고. => 그렇게 만들었다. 하하.
});



// Send Profile
router.get('/profile', requireAuth, (req, res, next) => {
    Profile.findOne({host: req.user._id}, (err, profile) => {
        //나중에 프로필에서 지울 목록은 다 지우고 보내줘라. 자기꺼면 아니고
        var temp = JSON.parse(JSON.stringify(profile));
        res.json({profile: temp});
    });
});

// Send Drops
router.get('/drops', requireAuth, (req, res, next) => {
  Drop.find({host: req.user._id}, (err, drops) => {
    if(err) throw err;

    var fetchData = JSON.parse(JSON.stringify(drops));
    var sendArray = [];
    var times = fetchData.length;
    var i = 0;

    fetchData.forEach((drop) => {
      Profile.findOne({email: drop.email}, (err, profile) => {
        var fetchProfile = JSON.parse(JSON.stringify(profile));

        sendArray[i] = {
          _id: fetchProfile._id,
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
    if(err) throw err;

    var fetchData = JSON.parse(JSON.stringify(letters));
    var sendArray = [];
    var times = fetchData.length;
    var i = 0;

    fetchData.forEach((letter) => {
      Profile.findOne({email: letter.email}, (err, profile) => {
        var fetchProfile = JSON.parse(JSON.stringify(profile));

        sendArray[i] = {
          _id: fetchProfile._id, // for iterate key.
          name: fetchProfile.name,
          nickname: fetchProfile.nickname,
          content: letter.content,
          date: letter.date
        };

        i ++;
        if( i == times ){
          res.json({letters: sendArray});
        }
      });
    });
  });
});

// Send Contacts
router.get('/contacts', requireAuth, (req, res, next) => {
  Letter.find({host: req.user._id}, (err, contacts) => {
    if(err) throw err;

    var fetchData = JSON.parse(JSON.stringify(contacts));
    var sendArray = [];
    var times = fetchData.length;
    var i = 0;

    fetchData.forEach((contact) => {
      Profile.findOne({email: contact.email}, (err, profile) => {
        var fetchProfile = JSON.parse(JSON.stringify(profile));

        sendArray[i] = {
          _id: fetchProfile._id, // for iterate key.
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


module.exports = router;

/*
Array.prototype.mapAndSend = function(callback, sender, thisArg) {

   var T, A, k;

   if (this == null) {
     throw new TypeError(' this is null or not defined');
   }

   // 1. Let O be the result of calling ToObject passing the |this|
   //    value as the argument.
   var O = Object(this);

   // 2. Let lenValue be the result of calling the Get internal
   //    method of O with the argument "length".
   // 3. Let len be ToUint32(lenValue).
   var len = O.length >>> 0;

   // 4. If IsCallable(callback) is false, throw a TypeError exception.
   // See: http://es5.github.com/#x9.11
   if (typeof callback !== 'function') {
     throw new TypeError(callback + ' is not a function');
   }

   // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
   if (arguments.length > 1) {
     T = thisArg;
   }

   // 6. Let A be a new array created as if by the expression new Array(len)
   //    where Array is the standard built-in constructor with that name and
   //    len is the value of len.
   A = new Array(len);

   // 7. Let k be 0
   k = 0;

   // 8. Repeat, while k < len
   while (k < len) {

     var kValue, mappedValue;

     // a. Let Pk be ToString(k).
     //   This is implicit for LHS operands of the in operator
     // b. Let kPresent be the result of calling the HasProperty internal
     //    method of O with argument Pk.
     //   This step can be combined with c
     // c. If kPresent is true, then
     if (k in O) {

       // i. Let kValue be the result of calling the Get internal
       //    method of O with argument Pk.
       kValue = O[k];

       // ii. Let mappedValue be the result of calling the Call internal
       //     method of callback with T as the this value and argument
       //     list containing kValue, k, and O.
       mappedValue = callback.call(T, kValue, k, O);

       // iii. Call the DefineOwnProperty internal method of A with arguments
       // Pk, Property Descriptor
       // { Value: mappedValue,
       //   Writable: true,
       //   Enumerable: true,
       //   Configurable: true },
       // and false.

       // In browsers that support Object.defineProperty, use the following:
       // Object.defineProperty(A, k, {
       //   value: mappedValue,
       //   writable: true,
       //   enumerable: true,
       //   configurable: true
       // });

       // For best browser support, use the following:
       A[k] = mappedValue;
     }
     // d. Increase k by 1.
     k++;
   }
   console.log(A);
   // 9. return A
   //return A;
   sender(A);
 };
*/