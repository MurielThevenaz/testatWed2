var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function getNote(id) {
    let note = null;
    db.findOne({ _id: id }, function(err, doc) {
        note = doc;
    });
    return note;
}

function addNote(note, callback) {
    note.creationDate = Date.now();
    db.insert(note, callback);
}

function getAllNotesByDueDate() {
    let result = [];
    db.find({}).sort({dueDate: 1}).exec(function(err, docs) {
        docs.forEach(function(d) {
            result.push(d);
        });
    });
    return result;
}

function getAllNotesByCreatedDate() {
    let result = [];
    db.find({}).sort({creationDate: 1}).exec(function(err, docs) {
        docs.forEach(function(d) {
            result.push(d);
        });
    });
    return result;
}

function getAllNotesByImportance() {
    let result = [];
    db.find({}).sort({importance: -1}).exec(function(err, docs) {
        docs.forEach(function(d) {
            result.push(d);
        });
    });
    return result;
}

function hideDone(notes) {
    newNotes = null;
    notes.forEach(function(note) {
        if(note.done === 1) {
            newNotes.push(note);
        }
    });
    notes = newNotes;
    return notes;
}

module.exports = {getNote, addNote, getAllNotesByDueDate, getAllNotesByCreatedDate, getAllNotesByImportance, hideDone};