var express = require('express');
var router = express.Router();
const toDoController = require('../controllers/toDoController');

router.get('/',  toDoController.index);
router.post('/toDoList', toDoController.saveEntry);
router.get('/toDoEntry', toDoController.redirectToEntry);

module.exports = router;
