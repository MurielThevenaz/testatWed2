var express = require('express');
var router = express.Router();
const toDoController = require('../controllers/toDoController');

router.get('/',  toDoController.loadPage);
router.get('/toggleDone/:id',  toDoController.toggleDone);
router.post('/saveEntry',  toDoController.saveEntry);
router.post('/saveEntry/:id',  toDoController.updateEntry);
router.get('/toDoEntry/', toDoController.redirectToEntry);

module.exports = router;
