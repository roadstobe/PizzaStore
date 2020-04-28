const {Router} = require('express');

const feedbackController = require('../controllers/feedbackController');

const router = Router();

router.post('/add', feedbackController.addFeedBack)
router.post('/get', feedbackController.getLatestFeedback)
module.exports = router;
