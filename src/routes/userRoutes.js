import express from 'express';
import { getUsers, createUsers, updateUser, deleteUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', createUsers);
userRouter.put('/', updateUser);
userRouter.delete('/', deleteUser);

export default userRouter; 