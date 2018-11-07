var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function getNote(id, callback) {
    db.findOne({ _id: id }, callback);
}

function addNote(note, callback) {
    db.insert(note, callback);
}

function getAllNotes(callback) {
    let findQuery = {};
    db.find(findQuery);
}

module.exports = {getNote, addNote, getAllNotes};