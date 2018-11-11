var express = require('express');
var router = express.Router();
const toDoController = require('../controllers/toDoController');

router.get('/',  toDoController.index);
router.post('/saveEntry',  toDoController.saveEntry);
router.post('/saveEntry/:id',  toDoController.updateEntry);
router.get('/toDoList/:sort', toDoController.getAllNotes);
router.get('/toDoEntry/:id', toDoController.redirectToEntry);

module.exports = router;
