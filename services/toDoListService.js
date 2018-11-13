let Datastore = require('nedb');
let db = new Datastore({ filename: './data/notes.db', autoload: true });

// in memory database
let configuration = new Datastore();

function initializeConfig(body, callback) {
    let initialization = {
        id: 1,
        sorting: 'dueDate',
        order: 1,
        isHidden: false,
        style: 'blue'
    };
    configuration.insert(initialization, function() {
        getAllNotes(callback);
    });
}

function updateConfig(updateConfig, callback) {
    configuration.findOne({ id: 1 }, function(err, config) {
        switch(updateConfig) {
            case 'dueDate':
                config.sorting = updateConfig;
                config.order = 1;
                break;
            case 'createdDate':
                config.sorting = updateConfig;
                config.order = -1;
                break;
            case 'importance':
                config.sorting = updateConfig;
                config.order = -1;
                break;
            case 'toggleStyle':
                if(config.style === 'white') {
                    config.style = 'blue';
                } else {
                    config.style = 'white'
                }
                break;
            case 'toggleHide':
                if(config.isHidden) {
                    config.isHidden = false;
                } else {
                    config.isHidden = true;
                }
                break;
            default:
        }
        configuration.update({id: 1}, config, {}, function() {
            getAllNotes(callback);
        });
    });
}

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

function getAllNotes(callback) {
    configuration.findOne({ id: 1 }, function(err, config) {
        if (config.isHidden) {
            db.find({$not: {done: 'done' }}).sort({ [config.sorting]: config.order }).exec(function(err, notes) {
                callback(err, notes, config.style);
            });
        } else {
            db.find({}).sort({ [config.sorting]: config.order }).exec(function(err, notes) {
                callback(err, notes, config.style);
            });
        }
    });
}

module.exports = {getNote, addNote, updateNote, getAllNotes, toggleDone, initializeConfig, updateConfig};