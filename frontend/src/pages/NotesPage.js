import React, { useState, useEffect } from 'react';
import { getNotesUseCase, addNoteUseCase, deleteNoteUseCase } from '../useCases/notesUseCases';
import { debugNote } from '../utils/debugHelper';
import NotesList from '../components/NotesList';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fonction pour charger les notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      console.log("fetchNotes - appel de getNotesUseCase.execute()");
      const fetchedNotes = await getNotesUseCase.execute();
      
      console.log("fetchNotes - notes récupérées:", fetchedNotes);
      console.log("fetchNotes - type:", typeof fetchedNotes);
      console.log("fetchNotes - est un tableau?", Array.isArray(fetchedNotes));
      
      if (Array.isArray(fetchedNotes)) {
        setNotes(fetchedNotes);
        setError(null);
      } else {
        console.error("fetchNotes - les notes récupérées ne sont pas un tableau!");
        setNotes([]);
        setError("Format de données incorrect");
      }
    } catch (error) {
      console.error("fetchNotes - erreur lors du chargement:", error);
      setError(`Erreur: ${error.message}`);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadNotes = async () => {
      try {
        // C'est ici que le composant appelle le use case pour récupérer les notes
        const fetchedNotes = await getNotesUseCase.execute();
        
        // Les notes récupérées sont ensuite stockées dans l'état du composant
        if (Array.isArray(fetchedNotes)) {
          setNotes(fetchedNotes);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error("NotesPage - erreur lors du chargement:", error);
        setNotes([]);
      }
    };

    loadNotes();
  }, []);

  const handleAddNote = async () => {
    try {
      if (!newNote.trim()) {
        console.error("Tentative d'ajout d'une note vide");
        return;
      }
      await addNoteUseCase.execute({ content: newNote });
      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note:', error);
    }
  };

  const handleEditNote = (note) => {
    debugNote(note, 'handleEditNote');
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleDeleteNote = async (noteId) => {
    console.log("handleDeleteNote appelé avec ID:", noteId);
    console.log("Type de noteId:", typeof noteId);
    try {
      if (!noteId) {
        console.error("Tentative de suppression d'une note sans identifiant valide");
        return;
      }
      const idToDelete = String(noteId);
      console.log("Suppression de la note avec ID:", idToDelete);
      await deleteNoteUseCase.execute(idToDelete);
      console.log("Suppression réussie, actualisation des notes");
      fetchNotes();
    } catch (error) {
      console.error("Erreur lors de la suppression de la note:", error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      {loading && <p>Chargement des notes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <NotesList 
        notes={notes} 
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Nouvelle note"
      />
      <button onClick={handleAddNote}>Ajouter</button>
    </div>
  );
};

export default NotesPage;