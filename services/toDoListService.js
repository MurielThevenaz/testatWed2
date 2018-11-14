let Datastore = require('nedb');
let db = new Datastore({ filename: './data/todos.db', autoload: true });


function getNote(id, callback) {
    db.findOne({ _id: id }, callback);
}

function addNote(note, callback) {
    note.creationDate = Date.now();
    if(note.done === 'done') {
        note.done = 'done';
    } else {
        note.done = 'not done';
    }
    db.insert(note, callback);
}

function updateNote(id, note, callback) {
    db.update({_id: id}, note, {}, callback);
}

function toggleDone(id, callback) {
    db.findOne({ _id: id }, function(err, note) {
        if (note.done === 'done') {
            note.done = 'not done';
        } else {
            note.done = 'done';
        }
        db.update({_id: id}, note, {}, callback);
    });
}

function getAllNotes(settings, callback) {
    if (settings.hidden === 'yes') {
        db.find({$not: {done: 'done' }}).sort({ [settings.orderBy]: settings.orderDirection }).exec(function(err, notes) {
            callback(err, notes, settings.style, settings.orderDirection, settings.hidden);
        });
    } else {
        db.find({}).sort({ [settings.orderBy]: settings.orderDirection }).exec(function(err, notes) {
            callback(err, notes, settings.style, settings.orderDirection, settings.hidden);});
    }
}

module.exports = {getNote, addNote, updateNote, getAllNotes, toggleDone};