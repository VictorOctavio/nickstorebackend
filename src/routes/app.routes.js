const {Router} = require('express');
const CTRL = require('../controllers/app.controller');
const ValidateToken = require('../libs/validateToken');

const router = Router();

router.post('/new-sub', CTRL.newSub);
router.get('/confirm-sub', ValidateToken, CTRL.confirSub);

module.exports = router;