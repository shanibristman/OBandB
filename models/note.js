
const DB = require('../utils/db');

class Note {
    title;
    description;
    createdAt;
    isActive;

    constructor(title = "", description = "") {
        this.title = title;
        this.description = description;
        this.createdAt = Date.now();
        this.isActive = true;
    }

    async GetAllActiveNotes() {
        try {
            return await new DB().FindAll('notes', { isActive: true });
        } catch (error) {
            return error;
        }
    }

    async GetAllNotes() {
        try {
            return await new DB().FindAll('notes');
        } catch (error) {
            return error;
        }
    }

    async GetNoteByID(id) {
        try {
            return await new DB().FindByID('notes', id);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async InsertNewNote() {
        try {
            return await new DB().Insert('notes', this); 
        } catch (error) {
            return error;
        } 
    }

    async UpdateNoteById(id) {
        try {
            return await new DB().UpdateDocById('notes', id, this);
        } catch (error) {
            console.log(error);
            return error;
        } 
    }

    async DeleteNote(id) {
        try {
            return await new DB().DeactivateDocById('notes',id);
        } catch (error) {
            return error;
        }
    }
}

module.exports = Note;