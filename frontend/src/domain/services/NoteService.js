export default class NoteService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }
  
  validateNote(title, content) {
    if (!title || title.trim() === '') {
      throw new Error('Le titre est obligatoire');
    }
    
    if (!content || content.trim() === '') {
      throw new Error('Le contenu est obligatoire');
    }
  }
}