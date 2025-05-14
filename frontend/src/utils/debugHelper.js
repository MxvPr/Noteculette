/**
 * Utilitaire pour déboguer les problèmes d'identifiants de notes
 */
export const debugNote = (note, location) => {
  console.log(`[DEBUG ${location}]`, {
    hasNote: !!note,
    noteType: typeof note,
    id: note?.id,
    _id: note?._id,
    hasValidId: !!(note?.id || note?._id),
    noteContent: note
  });
};

export const debugNotes = (notes, location) => {
  console.log(`[DEBUG ${location}] Notes array:`, {
    length: notes?.length || 0,
    isArray: Array.isArray(notes),
    notes: notes?.map(note => ({
      id: note?.id,
      _id: note?._id,
      title: note?.title
    }))
  });
};
