const {Router} = require('express');

const category = require('../controllers/categoryController');

const router = Router();

router.post('/add', category.addCategory);
router.post('/get', category.getCategory);
router.post('/delete', category.delete);
router.post('/deleteByCategory', category.deleteByCategory)

module.exports = router;
