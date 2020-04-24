const {Router} = require('express');

const cartController = require('../controllers/cartController');

const router = Router();

router.post('/add', cartController.addCartApi);
router.post('/get', cartController.getUserCart)

module.exports = router;
