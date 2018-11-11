const toDoListService = require('../services/toDoListService');

function index(req, res)
{
    toDoListService.getAllNotes(10, function (err, notes) {
        res.render('toDoList', { title: 'To Do List', notes});
    });
}

function getAllNotes(req, res)
{
    toDoListService.getAllNotes(req.params.code, function (err, notes) {
        res.render('toDoList', { title: 'To Do List', notes});
    });
}

function saveEntry(req, res)
{
    toDoListService.addNote(req.body, function() {
        getAllNotes(req, res);
    });
}

function updateEntry(req, res)
{
    toDoListService.updateNote(req.params.id, req.body, function() {
        getAllNotes(req, res);
    });
}

function redirectToEntry(req, res)
{
    if (req.params.id === 0) {
        res.render('toDoEntry');
    } else {
        toDoListService.getNote(req.params.id, function(err, note) {
           res.render('toDoEntry', note);
        });
    }
}

module.exports = {index, getAllNotes, redirectToEntry, saveEntry, updateEntry};