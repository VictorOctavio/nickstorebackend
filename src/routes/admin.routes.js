const CTRL = require('../controllers/admin.controller');
const {Router} = require('express');

const router = Router();

router.post('/create-admin', CTRL.createAdmin);
router.post('/login-admin', CTRL.loginAdmin);

module.exports = router;