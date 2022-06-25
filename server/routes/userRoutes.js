const {register,login,setAvatar,getMeterData,getMeterMetaData}= require("../controllers/usersController")

const router = require('express').Router();
router.post('/register',register);
router.post('/login',login);
router.post('/setAvatar/:id',setAvatar);
router.post('/getMeterData',getMeterData);
router.post('/getMeterMetaData',getMeterMetaData);

module.exports = router;