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

function redirectToNewEntry(req, res)
{
    res.render('toDoEntry');
}

function saveEntry(req, res)
{
    toDoListService.addNote(req.body, function() {
        getAllByDueDate(req, res);
    });
}

function redirectToEntry(req, res)
{
    res.render('toDoEntry', {title: 'Change Entry', note: toDoListService.getNote(req.body._id)});
}



module.exports = {getAllByDueDate, getAllByCreatedDate, getAllByImportance, redirectToNewEntry, redirectToEntry, saveEntry};