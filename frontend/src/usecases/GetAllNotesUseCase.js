class GetAllNotesUseCase {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute() {
    try {
      console.log("GetAllNotesUseCase - début de l'exécution");
      const notes = await this.noteRepository.getAll();
      
      console.log("GetAllNotesUseCase - notes obtenues:", notes);
      console.log("GetAllNotesUseCase - type:", typeof notes);
      console.log("GetAllNotesUseCase - est un tableau?", Array.isArray(notes));
      
      // Sécurité supplémentaire
      return Array.isArray(notes) ? notes : [];
    } catch (error) {
      console.error("GetAllNotesUseCase - erreur:", error);
      return [];
    }
  }
}

export default GetAllNotesUseCase;
