import * as calculatriceService from '../services/calculatriceService.js';

export const addition = (req, res) => {
  try {
    const { a, b } = req.body;
    
    // Validation des entrées
    if (a === undefined || b === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Les paramètres a et b sont requis' 
      });
    }
    
    const result = calculatriceService.addition(Number(a), Number(b));
    
    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const soustraction = (req, res) => {
  try {
    const { a, b } = req.body;
    
    if (a === undefined || b === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Les paramètres a et b sont requis' 
      });
    }
    
    const result = calculatriceService.soustraction(Number(a), Number(b));
    
    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const multiplication = (req, res) => {
  try {
    const { a, b } = req.body;
    
    if (a === undefined || b === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Les paramètres a et b sont requis' 
      });
    }
    
    const result = calculatriceService.multiplication(Number(a), Number(b));
    
    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const division = (req, res) => {
  try {
    const { a, b } = req.body;
    
    if (a === undefined || b === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Les paramètres a et b sont requis' 
      });
    }
    
    // Vérification de la division par zéro
    if (Number(b) === 0) {
      return res.status(400).json({
        success: false,
        message: 'Impossible d\'effectuer une division par zéro'
      });
    }
    
    const result = calculatriceService.division(Number(a), Number(b));
    
    res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default {
  addition,
  soustraction,
  multiplication,
  division
};