var express = require('express');
var router = express.Router();
const toDoController = require('../controllers/toDoController');

router.get('/',  toDoController.getAllByDueDate);
router.post('/saveEntry',  toDoController.saveEntry);
router.post('/toDoByDueDate',  toDoController.getAllByDueDate);
router.post('/toDoByCreatedDate', toDoController.getAllByCreatedDate);
router.post('/toDoByImportance', toDoController.getAllByImportance);
router.get('/toDoEntry', toDoController.redirectToNewEntry);
router.post('/toDoEntry/{{_id}}', toDoController.redirectToEntry);

module.exports = router;
