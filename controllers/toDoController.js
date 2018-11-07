const toDoListService = require('../services/toDoListService');
const qs = require('qs');

function index(req, res)
{
    res.render('toDoList', { title: 'To Do List' });
}

function redirectToEntry(req, res)
{
    res.render('toDoEntry');
}

function saveEntry(req, res)
{
    toDoListService.addNote(req.body, function(err, note) {
        res.render('toDoList', { title: 'To Do List', notes : {list : toDoListService.getAllNotes()} });
    });
}

module.exports = {index, redirectToEntry, saveEntry};