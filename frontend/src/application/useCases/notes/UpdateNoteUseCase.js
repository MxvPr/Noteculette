export default class UpdateNoteUseCase {
  constructor(noteRepository, noteService) {
    this.noteRepository = noteRepository;
    this.noteService = noteService;
  }
  
  async execute(id, title, content) {
    this.noteService.validateNote(title, content);
    
    return await this.noteRepository.update(id, { title, content });
  }
}