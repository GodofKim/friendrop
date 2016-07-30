var express = require('express');
var router = express.Router();
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session:false});

router.post('/signup', Authentication.signup);
// requireSignin이 req를 먼저 낚아채도록 이렇게 해준다??? 먼소리고
router.post('/signin', requireSignin, Authentication.signin);

// 앞으로 auth가 필요한 라우트로 갈때마다  requireAuth를 넣어주면 된다.
router.get('/', requireAuth , (req, res, next)=>{
  res.send({ message: "서버로부터 보내지는 메시지입니다."});
});
module.exports = router;
