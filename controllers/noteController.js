const Note = require('../models/note');
const NoteRouter = require('express').Router();

//CRUD routes

NoteRouter.get('/', async (req, res) => {
    try {
        let allNotes = await new Note().GetAllActiveNotes();
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(500).json({ error });
    }
});

NoteRouter.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let note = await new Note().GetNoteByID(id);
        if (note.title == undefined) 
            res.status(404).json({ message: 'note not found', note });
        else
            res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error });
    }
});

NoteRouter.post('/add', async (req, res) => {
    /*
     * setp 0: make sure to require the model class
     * step 1: get the data from the req.body 
     * step 2: create a ne instance of the class
     * step 3: connect to DB
     * step 4: insert the record
     */
    let { title, description } = req.body;
    let note = new Note(title, description);

    try {
        let result = await note.InsertNewNote();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }
});

NoteRouter.put('/:id', async (req, res) => {
    let {id} = req.params;
    let {title, description} = req.body;
    try {
        let result = await new Note(title, description).UpdateNoteById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

NoteRouter.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try {
        let result = await new Note().DeleteNote(id);
        res.status(200).json(result);
    } catch (error) {
        es.status(500).json({ error });
    }
});


module.exports = NoteRouter;