const {Router} = require('express');
const CTRL = require('../controllers/producto.controller');

const {v4: uuidv4} = require('uuid');
const multer = require('multer');
const path = require('path');

const router = Router();

//multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'), 
    filename: (req, file, cb) => cb(null, uuidv4(), path.extname(file.originalname).toLowerCase())
})

const configMulter = multer({storage}).array('images', 5);

//Routes
router.post('/saved-product', configMulter, CTRL.save_product);
router.put('/update-product/:id', CTRL.update_product);
router.delete('/deleted-product/:id', CTRL.delete_product);

router.put('/create-oferta/:id', CTRL.create_oferta)

router.get('/product/:id', CTRL.get_product);
router.get('/products', CTRL.products);

//Module export
module.exports = router;