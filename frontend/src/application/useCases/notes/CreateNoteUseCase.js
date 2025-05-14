import Note from '../../../domain/entities/Note.js';

export default class CreateNoteUseCase {
  constructor(noteRepository, noteService) {
    this.noteRepository = noteRepository;
    this.noteService = noteService;
  }
  
  async execute(title, content) {
    this.noteService.validateNote(title, content);
    
    const note = new Note(null, title, content);
    return await this.noteRepository.save(note);
  }
}