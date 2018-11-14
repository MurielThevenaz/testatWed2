const toDoListService = require('../services/toDoListService');

function loadPage(req, res)
{
    toDoListService.getAllNotes(req.userSettings, function (err, notes, style, orderDirection, hidden) {
        res.render('toDoList', { title: 'To Do List', notes, style, orderDirection, hidden});
    });
}

function saveEntry(req, res)
{
    toDoListService.addNote(req.body, function() {
        loadPage(req, res);
    });
}

function updateEntry(req, res)
{
    toDoListService.updateNote(req.params.id, req.body, function() {
        loadPage(req, res);
    });
}

function redirectToEntry(req, res)
{
    if (req.query.id === '0') {
        res.render('toDoEntry', {style: req.userSettings.style});
    } else {
        toDoListService.getNote(req.query.id, function(err, note, style) {
           res.render('toDoEntry', {
               title: note.title,
               note: note.note,
               dueDate: note.dueDate,
               importance: note.importance,
               style: req.userSettings.style});
        });
    }
}

function toggleDone(req, res)
{
    toDoListService.toggleDone(req.params.id, function() {
        loadPage(req, res);
    });
}

module.exports = {loadPage, redirectToEntry, saveEntry, updateEntry, toggleDone};