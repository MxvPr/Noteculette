class ApiNoteRepository {
  constructor(api) {
    this.api = api;
  }

  async getAll() {
    try {
      // C'est ici que les notes sont récupérées de l'API
      const notes = await this.api.getNotes();
      
      // Vérification et transformation des données
      return Array.isArray(notes) ? notes : [];
    } catch (error) {
      console.error("Erreur dans le référentiel lors de la récupération des notes:", error);
      return [];
    }
  }

  async create(noteData) {
    try {
      return await this.api.addNote(noteData);
    } catch (error) {
      console.error("ApiNoteRepository.create - erreur:", error);
      throw error;
    }
  }

  async update(noteId, noteData) {
    try {
      return await this.api.updateNote(noteId, noteData);
    } catch (error) {
      console.error("ApiNoteRepository.update - erreur:", error);
      throw error;
    }
  }

  async delete(noteId) {
    try {
      return await this.api.deleteNote(noteId);
    } catch (error) {
      console.error("ApiNoteRepository.delete - erreur:", error);
      throw error;
    }
  }
}

export default ApiNoteRepository;