import React, { useState, useEffect, useCallback } from 'react';
import NoteForm from './NoteForm';
import NotesList from './NotesList';

const NotesPage = ({ 
  getAllNotesUseCase,
  createNoteUseCase,
  updateNoteUseCase,
  deleteNoteUseCase
}) => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      const loadedNotes = await getAllNotesUseCase.execute();
      setNotes(loadedNotes);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getAllNotesUseCase]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleAddNote = async (noteData) => {
    try {
      const savedNote = await createNoteUseCase.execute(
        noteData.title,
        noteData.content
      );
      setNotes([...notes, savedNote]);
    } catch (err) {
      setError('Erreur lors de la création de la note: ' + err.message);
      console.error(err);
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      const updatedNote = await updateNoteUseCase.execute(
        id,
        noteData.title,
        noteData.content
      );
      setNotes(notes.map(note => note.id === id ? updatedNote : note));
      setEditingNote(null);
    } catch (err) {
      setError('Erreur lors de la mise à jour de la note: ' + err.message);
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNoteUseCase.execute(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression de la note');
      console.error(err);
    }
  };

  const startEditing = (note) => {
    setEditingNote(note);
  };

  const cancelEditing = () => {
    setEditingNote(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Mes Notes</h2>
      
      {error && <div className="text-red-600">{error}</div>}
      
      <NoteForm 
        onSubmit={editingNote ? (note) => handleUpdateNote(editingNote.id, note) : handleAddNote}
        initialValues={editingNote || {}}
        isEditing={!!editingNote}
        onCancel={cancelEditing}
      />
      
      {loading ? (
        <p className="text-gray-500">Chargement des notes...</p>
      ) : (
        <NotesList 
          notes={notes} 
          onEdit={startEditing} 
          onDelete={handleDeleteNote} 
        />
      )}
    </div>
  );
};

export default NotesPage;