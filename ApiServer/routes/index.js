var express = require('express');
var router = express.Router();
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session:false});

const User = require('../models/user');

const tempArray = [
  { "name":  "원빈",
    "email": "wonbin@gmail.com",
    "profile": { "school": "원빈대", "major": "원빈학과"}
  },
  { "name": "현빈",
    "email": "hyeonbin@gmail.com",
    "profile": { "school": "시크릿대", "major": "가든학과"}
  },
  { "name": "나얼",
    "email": "naul@gmail.com",
    "profile": { "school": "소울대", "major": "공명학과"}
  }
];


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
});

module.exports = router;
