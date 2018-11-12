var express = require('express');
var router = express.Router();
const toDoController = require('../controllers/toDoController');

router.get('/',  toDoController.index);
router.post('/saveEntry',  toDoController.saveEntry);
router.post('/toggleDone/:id',  toDoController.toggleDone);
router.post('/saveEntry/:id',  toDoController.updateEntry);
router.post('/toDoList/:updateConfig', toDoController.getConfig);
router.get('/toDoEntry/:id', toDoController.redirectToEntry);

module.exports = router;
