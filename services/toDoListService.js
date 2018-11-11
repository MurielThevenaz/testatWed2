var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function getNote(id, callback) {
    db.findOne({ _id: id }, callback);
}

function addNote(note, callback) {
    note.creationDate = Date.now();
    db.insert(note, callback);
}

function updateNote(id, note, callback) {
    db.update({_id: id}, note, {}, callback);
}

function getAllNotes(sort, callback) {
    switch(sort) {
        case 'date':
            queryNotes(sort, 1, false, callback);
            break;
        case 'createdDate':
            queryNotes(sort, 1, false, callback);
            break;
        case 'importance':
            queryNotes(sort, -1, false, callback);
            break;
        default:
            queryNotes('date', 1, false, callback);
    }
}

function queryNotes(sorting, order, isHidden, callback) {
    if (isHidden) {
        db.find({$not: {done: '1' }}).sort({ [sorting]: order }).exec(function(err, notes) {
            callback(err, notes);
        });
    } else {
        db.find({}).sort({ [sorting]: order }).exec(function(err, notes) {
            callback(err, notes);
        });
    }
}

module.exports = {getNote, addNote, updateNote, getAllNotes};