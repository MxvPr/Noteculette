export default class DeleteNoteUseCase {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute(noteId) {
    if (!noteId) {
      throw new Error("Un identifiant de note valide est requis pour la suppression");
    }
    return await this.noteRepository.delete(noteId);
  }
}