import express from 'express';
import { getUserBookings, updateFavorite, getFavorites } from '../controllers/userController.js';
import { get } from 'mongoose';


const userRouter = express.Router();


userRouter.get('/bookings', getUserBookings);
userRouter.post('/update-favorite', updateFavorite);
userRouter.get('/favorites', getFavorites); // Assuming you have a getFavorites function in userController



export default userRouter;
