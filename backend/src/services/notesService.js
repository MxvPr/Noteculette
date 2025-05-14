import Note from '../models/noteModel.js';

export default {
    createNote: async (noteData) => {
        try {
            const note = new Note(noteData);
            const savedNote = await note.save();
            return savedNote;
        } catch (error) {
            throw new Error(`Erreur lors de la création de la note: ${error.message}`);
        }
    },
    getAllNotes: async () => {
        try {
            const notes = await Note.find({}).sort({ createdAt: -1 });
            return notes;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des notes: ${error.message}`);
        }
    },
    getNoteById: async (noteId) => {
        try {
            const note = await Note.findById(noteId);
            if (!note) {
                throw new Error('Note non trouvée');
            }
            return note;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la note: ${error.message}`);
        }
    },
    updateNote: async (noteId, updatedData) => {
        try {
            const note = await Note.findByIdAndUpdate(
                noteId, 
                updatedData, 
                { new: true, runValidators: true }
            );
            if (!note) {
                throw new Error('Note non trouvée');
            }
            return note;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de la note: ${error.message}`);
        }
    },
    deleteNote: async (noteId) => {
        try {
            const note = await Note.findByIdAndDelete(noteId);
            if (!note) {
                throw new Error('Note non trouvée');
            }
            return { message: 'Note supprimée avec succès' };
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de la note: ${error.message}`);
        }
    }
};