const toDoListService = require('../services/toDoListService');

function index(req, res)
{
    toDoListService.initializeConfig(function (err, notes) {
        res.render('toDoList', { title: 'To Do List', notes});
    });
}

function getConfig(req, res)
{
    toDoListService.updateConfig(req.params.updateConfig, function (err, notes) {
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

function toggleDone(req, res)
{
    toDoListService.toggleDone(req.params.id, function() {
        getAllNotes(req, res);
    });
}

function getAllNotes(req, res)
{
    toDoListService.getAllNotes(function (err, notes) {
        res.render('toDoList', { title: 'To Do List', notes});
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

module.exports = {index, getConfig, redirectToEntry, saveEntry, updateEntry, toggleDone};