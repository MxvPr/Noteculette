// Vérifier l'importation du repository
import ApiNoteRepository from '../repositories/ApiNoteRepository';
import CalculatorApi from '../infrastructure/api/CalculatorApi';

// Créer une instance de l'API et du repository
const calculatorApi = new CalculatorApi();
const noteRepository = new ApiNoteRepository(calculatorApi);

// Cas d'utilisation pour récupérer toutes les notes
export const getNotesUseCase = {
  execute: async () => {
    try {
      // Appel au repository pour récupérer les notes
      const notes = await noteRepository.getAll();
      return Array.isArray(notes) ? notes : [];
    } catch (error) {
      console.error("getNotesUseCase - erreur:", error);
      return [];
    }
  }
};

// Autres cas d'utilisation
export const addNoteUseCase = {
  execute: async (noteData) => {
    try {
      const result = await noteRepository.create(noteData);
      return {
        success: true,
        note: result
      };
    } catch (error) {
      console.error("addNoteUseCase - erreur:", error);
      return {
        success: false,
        error: error.message || "Erreur lors de la création de la note"
      };
    }
  }
};

export const updateNoteUseCase = {
  execute: async (noteId, noteData) => {
    try {
      const result = await noteRepository.update(noteId, noteData);
      return {
        success: true,
        note: result
      };
    } catch (error) {
      console.error("updateNoteUseCase - erreur:", error);
      return {
        success: false,
        error: error.message || "Erreur lors de la mise à jour de la note"
      };
    }
  }
};

export const deleteNoteUseCase = {
  execute: async (noteId) => {
    try {
      await noteRepository.delete(noteId);
      return {
        success: true,
        message: "Note supprimée avec succès"
      };
    } catch (error) {
      console.error("deleteNoteUseCase - erreur:", error);
      return {
        success: false,
        error: error.message || "Erreur lors de la suppression de la note"
      };
    }
  }
};

export const getNoteByIdUseCase = {
  execute: async (noteId) => {
    try {
      const note = await noteRepository.getById(noteId);
      return {
        success: true,
        note
      };
    } catch (error) {
      console.error("getNoteByIdUseCase - erreur:", error);
      return {
        success: false,
        error: error.message || "Erreur lors de la récupération de la note"
      };
    }
  }
};
