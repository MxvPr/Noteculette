import mongoose from 'mongoose';
import Note from '../models/noteModel.js';

// Récupérer toutes les notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json({
      success: true,
      notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Créer une nouvelle note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Le titre et le contenu sont requis'
      });
    }
    
    const note = new Note({
      title,
      content
    });
    
    const savedNote = await note.save();
    
    res.status(201).json({
      success: true,
      note: savedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Récupérer une note par son ID
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si l'ID est un ObjectId MongoDB valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de note invalide'
      });
    }
    
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mettre à jour une note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    // Vérifier si l'ID est un ObjectId MongoDB valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de note invalide'
      });
    }
    
    // Vérifier si la note existe
    const noteExists = await Note.findById(id);
    if (!noteExists) {
      return res.status(404).json({
        success: false,
        message: 'Note non trouvée'
      });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      note: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Supprimer une note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si l'ID est un ObjectId MongoDB valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de note invalide'
      });
    }
    
    // Vérifier si la note existe
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note non trouvée'
      });
    }
    
    await Note.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Note supprimée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote
};