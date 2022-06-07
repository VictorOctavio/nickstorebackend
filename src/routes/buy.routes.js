const {Router} = require('express');
const controller = require('../controllers/buy.controller');

const router = Router();

//Routes
router.post('/buy', controller.buyProducts);

module.exports = router;