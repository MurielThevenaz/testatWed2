var express = require('express');
var router = express.Router();
const randomController = require('../controllers/toDoController');

router.get('/',  randomController.index);
router.get('/random', randomController.renderRandomResult);
router.post('/random', randomController.redirectToRandomResult);

module.exports = router;
