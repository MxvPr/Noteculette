import express from 'express';
import calculatriceController from '../controllers/calculatriceController.js';

const router = express.Router();

router.post('/addition', calculatriceController.addition);
router.post('/soustraction', calculatriceController.soustraction);
router.post('/multiplication', calculatriceController.multiplication);
router.post('/division', calculatriceController.division);

export default router;