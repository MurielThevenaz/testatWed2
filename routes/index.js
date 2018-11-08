var express = require('express');
var router = express.Router();
const toDoController = require('../controllers/toDoController');

router.get('/',  toDoController.getAllByDueDate);
router.post('/toDoByDueDate', toDoController.saveEntry);
router.post('/toDoByCreatedDate', toDoController.getAllByCreatedDate);
router.post('/toDoByImportance', toDoController.getAllByImportance);
router.get('/toDoEntry', toDoController.redirectToEntry);

module.exports = router;
