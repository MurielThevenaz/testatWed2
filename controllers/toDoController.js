const toDoListService = require('../services/toDoListService');

function getAllByDueDate(req, res)
{
    res.render('toDoList', { title: 'To Do List', notes: toDoListService.getAllNotesByDueDate()});
}

function getAllByCreatedDate(req, res)
{
    res.render('toDoList', { title: 'To Do List', notes: toDoListService.getAllNotesByCreatedDate()});
}

function getAllByImportance(req, res)
{
    res.render('toDoList', { title: 'To Do List', notes: toDoListService.getAllNotesByImportance()});
}

function redirectToEntry(req, res)
{
    res.render('toDoEntry');
}

function saveEntry(req, res)
{
    toDoListService.addNote(req.body, function() {
        getAllByDueDate(req, res);
    });
}



module.exports = {getAllByDueDate, getAllByCreatedDate, getAllByImportance, redirectToEntry, saveEntry};