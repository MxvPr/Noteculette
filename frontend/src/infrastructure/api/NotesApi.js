import axios from 'axios';

const API_URL = 'http://localhost:5001/api/notes';

export default class NotesApi {
  async getAllNotes() {
    try {
      const response = await axios.get(API_URL);
      
      // Si les notes sont à l'intérieur d'un objet
      if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        // Rechercher un tableau dans la réponse
        const possibleNotes = response.data.notes || response.data.data || response.data.results;
        if (Array.isArray(possibleNotes)) {
          return this._normalizeNotes(possibleNotes);
        }
      }
      
      if (Array.isArray(response.data)) {
        return this._normalizeNotes(response.data);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getNoteById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      if (response.data && response.data.note) {
        return this._normalizeNote(response.data.note);
      } else {
        return this._normalizeNote(response.data);
      }
    } catch (error) {
      throw error;
    }
  }

  async createNote(note) {
    try {
      const response = await axios.post(API_URL, {
        title: note.title,
        content: note.content
      });
      
      // Normaliser la réponse si elle contient une note
      if (response.data && response.data.note) {
        return this._normalizeNote(response.data.note);
      }
      return this._normalizeNote(response.data);
    } catch (error) {
      throw error;
    }
  }

  async updateNote(id, data) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      if (response.data && response.data.note) {
        return this._normalizeNote(response.data.note);
      }
      return this._normalizeNote(response.data);
    } catch (error) {
      throw error;
    }
  }

  async getNotes() {
    try {
      const response = await axios.get(`${API_URL}`);
      
      // Analyse plus détaillée de la réponse
      if (typeof response.data === 'object' && !Array.isArray(response.data)) {
        // Si la réponse est un objet contenant un tableau de notes
        if (response.data.notes && Array.isArray(response.data.notes)) {
          return this._normalizeNotes(response.data.notes);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          return this._normalizeNotes(response.data.data);
        }
      }
      
      // Traitement si la réponse est un tableau
      if (Array.isArray(response.data)) {
        return this._normalizeNotes(response.data);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(noteId) {
    try {
      if (!noteId) {
        throw new Error("L'identifiant de la note est manquant pour la suppression");
      }
      
      const response = await axios.delete(`${API_URL}/${noteId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Méthodes utilitaires privées pour normaliser les données
  _normalizeNote(note) {
    if (!note) return null;
    
    // Créer une copie pour ne pas modifier l'original
    const normalizedNote = { ...note };
    
    // Convertir _id en id si nécessaire
    if (normalizedNote._id && !normalizedNote.id) {
      normalizedNote.id = normalizedNote._id;
    }
    
    return normalizedNote;
  }

  _normalizeNotes(notes) {
    if (!Array.isArray(notes)) return [];
    
    return notes.map(note => this._normalizeNote(note));
  }
}