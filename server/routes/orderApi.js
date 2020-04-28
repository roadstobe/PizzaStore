const {Router} = require('express');

const orderController = require('../controllers/orderController');

const router = Router();

router.post('/add', orderController.addOrderApi)
router.get('/get', orderController.getOrders)
// router.post('/delete', orderController.deleteOrder)
module.exports = router;
