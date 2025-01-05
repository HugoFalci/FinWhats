import express from 'express';
import { 
    getInstallments, 
    createInstallments, 
    updateInstallments, 
    deleteInstallments,
    deleteTransactionInstallments
} from '../controllers/installmentsController.js';

const installmentsRoutes = express.Router();

installmentsRoutes.delete('/transaction/:id', deleteTransactionInstallments);
installmentsRoutes.delete('/:id', deleteInstallments);
installmentsRoutes.put('/:id', updateInstallments);
installmentsRoutes.get('/', getInstallments);
installmentsRoutes.post('/', createInstallments);

export default installmentsRoutes;