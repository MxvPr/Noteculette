import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, initialValues = {}, isEditing = false, onCancel }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [content, setContent] = useState(initialValues.content || '');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setTitle(initialValues.title || '');
    setContent(initialValues.content || '');
  }, [initialValues]);

  useEffect(() => {
    setIsValid(title.trim() !== '' && content.trim() !== '');
  }, [title, content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({ title, content });
    
    if (!isEditing) {
      // Clear form after submission if it's not in edit mode
      setTitle('');
      setContent('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 glass-darker p-6 rounded-2xl mb-8 transition-all"
    >
      <h3 className="text-xl font-medium text-gray-800">
        {isEditing ? 'Modifier la note' : 'Ajouter une nouvelle note'}
      </h3>
      
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 bg-white bg-opacity-70 border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-apple-blue outline-none transition-all"
      />
      
      <textarea
        placeholder="Contenu"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-3 bg-white bg-opacity-70 border-0 rounded-xl min-h-[120px] shadow-sm resize-y focus:ring-2 focus:ring-apple-blue outline-none transition-all"
      />
      
      <div className="flex justify-end gap-3 mt-2">
        {isEditing && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-5 py-2.5 bg-gray-200 bg-opacity-70 hover:bg-gray-300 text-gray-700 rounded-xl transition-all"
          >
            Annuler
          </button>
        )}
        <button 
          type="submit" 
          disabled={!isValid}
          className={`px-5 py-2.5 rounded-xl text-white transition-all ${
            isValid 
              ? 'bg-apple-blue hover:bg-opacity-90' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isEditing ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;