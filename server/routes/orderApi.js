const {Router} = require('express');

const orderController = require('../controllers/orderController');

const router = Router();

router.post('/add', orderController.addOrderApi)
router.post('/get', orderController.getOrders)
router.post('/delete', orderController.deleteOrder)
module.exports = router;
