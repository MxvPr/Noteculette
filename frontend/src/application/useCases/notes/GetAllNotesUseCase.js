export default class GetAllNotesUseCase {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }
  
  async execute() {
    return await this.noteRepository.getAll();
  }
}