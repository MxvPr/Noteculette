import React from 'react';

const NotesList = ({ notes, onEdit, onDelete }) => {
  // S'assurer que notes est un tableau
  const safeNotes = Array.isArray(notes) ? notes : [];
  

  if (!safeNotes || safeNotes.length === 0) {
    return (
      <div className="glass-darker p-8 text-center rounded-2xl">
        <p className="text-gray-500 italic">
          Aucune note disponible. Créez votre première note !
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="notes-list">
      {safeNotes.map((note) => {
        // S'assurer que note est un objet valide
        if (!note || typeof note !== 'object') {
          return null;
        }
        
        // Normalisation de l'ID
        const noteId = note._id || note.id;

        return (
          <div 
            key={noteId || `note-${Math.random()}`}
            className="glass hover-scale p-5 rounded-2xl flex flex-col transition-all"
            data-testid={`note-item-${noteId}`}
          >
            <h3 className="font-semibold text-xl mb-3 text-gray-800" data-testid="note-title">{note.title || "Sans titre"}</h3>
            <p className="flex-grow text-gray-600 whitespace-pre-wrap mb-4" data-testid="note-content">{note.content || "Pas de contenu"}</p>
            <div className="border-t border-gray-200 pt-3 mt-auto flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {note.updatedAt ? 
                  `Modifié le ${formatDate(note.updatedAt)}` : 
                  "Date inconnue"}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    onEdit && onEdit(note);
                  }}
                  className="p-2 bg-white bg-opacity-50 hover:bg-opacity-70 text-gray-600 rounded-lg transition-all"
                  data-testid="edit-note-button"
                >
                  Éditer
                </button>
                <button 
                  onClick={() => {
                    if (noteId && onDelete) {
                      onDelete(noteId);
                    } else {
                      console.error("Impossible de supprimer - ID manquant ou fonction onDelete manquante");
                    }
                  }}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                  data-testid="delete-note-button"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotesList;