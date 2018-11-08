var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function getNote(id, callback) {
    db.findOne({ _id: id }, callback);
}

function addNote(note, callback) {
    note.creationDate = Date.now();
    db.insert(note, callback);
}

function getAllNotesByDueDate() {
    let result = getAllNotes();
    return result;
}

function getAllNotesByCreatedDate() {

}

function getAllNotesByImportance() {

}

function getAllNotes() {
    let result = [];
    db.find({}).exec(function(err, docs) {
        docs.forEach(function(d) {
            result.push(d);
        });
    });
    return result;
}

module.exports = {getNote, addNote, getAllNotesByDueDate, getAllNotesByCreatedDate, getAllNotesByImportance};