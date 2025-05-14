import React from 'react';
import NoteCard from './NoteCard';

const NotesList = ({ notes }) => {
  // Ajouter une validation des données
  const validNotes = Array.isArray(notes) ? notes : [];
  
  console.log("NotesList reçoit:", { 
    notes: validNotes, 
    notesType: typeof validNotes, 
    isArray: Array.isArray(validNotes),
    count: validNotes.length 
  });

  // Utiliser validNotes au lieu de notes
  return (
    <div className="notes-list">
      {validNotes.length > 0 ? (
        validNotes.map((note) => (
          <NoteCard 
            key={note._id || note.id || Math.random().toString()} 
            note={note} 
          />
        ))
      ) : (
        <p className="no-notes-message">Aucune note disponible. Créez votre première note !</p>
      )}
    </div>
  );
};

export default NotesList;