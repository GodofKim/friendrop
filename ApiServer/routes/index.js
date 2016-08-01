var express = require('express');
var router = express.Router();
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session:false});

const User = require('../models/user');
const Drop = require('../models/drop');

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

router.get('/drops', requireAuth, (req, res, next) => {
  Drop.find({host: req.user._id}, (err, drops) => {
    if(err) throw err;

    const temp = JSON.parse(JSON.stringify(drops));

    res.json({drops: temp});
  })
});

module.exports = router;
