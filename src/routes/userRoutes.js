import express from 'express';
import { 
    getUsers, 
    createUsers, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUser);
userRouter.get('/', getUsers);
userRouter.post('/', createUsers);

export default userRouter;