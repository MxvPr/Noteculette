import axios from 'axios';

const API_URL = 'http://localhost:5001/api/calculatrice';
const NOTES_API_URL = 'http://localhost:5001/api/notes';

export default class CalculatorApi {
  async addition(a, b) {
    const response = await axios.post(`${API_URL}/addition`, { a, b });
    return response.data;
  }

  async soustraction(a, b) {
    const response = await axios.post(`${API_URL}/soustraction`, { a, b });
    return response.data;
  }

  async multiplication(a, b) {
    const response = await axios.post(`${API_URL}/multiplication`, { a, b });
    return response.data;
  }

  async division(a, b) {
    const response = await axios.post(`${API_URL}/division`, { a, b });
    return response.data;
  }

  // Méthodes pour les notes
  async getNotes() {
    try {
      const response = await axios.get(`${NOTES_API_URL}`);
      console.log("Réponse axios complète:", response);
      
      // Ici la réponse est extraite et renvoyée au repository
      if (response && response.data && response.data.success && Array.isArray(response.data.notes)) {
        return response.data.notes;
      } else {
        console.warn("Structure de réponse inattendue:", response.data);
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des notes:', error);
      return [];
    }
  }

  async addNote(noteData) {
    try {
      const response = await axios.post(`${NOTES_API_URL}`, noteData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'une note:', error);
      throw error;
    }
  }

  async updateNote(noteId, noteData) {
    try {
      if (!noteId) {
        throw new Error("L'ID de la note est requis pour la mise à jour");
      }
      const response = await axios.put(`${NOTES_API_URL}/${noteId}`, noteData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la modification de la note ${noteId}:`, error);
      throw error;
    }
  }

  async deleteNote(noteId) {
    try {
      if (!noteId) {
        throw new Error("L'ID de la note est requis pour la suppression");
      }
      const response = await axios.delete(`${NOTES_API_URL}/${noteId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la note ${noteId}:`, error);
      throw error;
    }
  }
}