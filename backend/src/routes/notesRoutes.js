import express from 'express';
import notesController from '../controllers/notesController.js';

const router = express.Router();

router.post('/', notesController.createNote);
router.get('/', notesController.getAllNotes);
router.get('/:id', notesController.getNoteById);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

export default router;