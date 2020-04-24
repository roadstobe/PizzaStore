const {Router} = require('express');

const userController = require('../controllers/userController');

const router = Router();

router.post('/add', userController.addUserApi)
router.post('/update', userController.update);
router.post('/orders', userController.getOrders)
router.post('/check', userController.checkUser)

module.exports = router;
