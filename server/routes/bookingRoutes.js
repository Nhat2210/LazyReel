import express from 'express';
import { createBooking, getBookings } from '../controllers/bookingController.js';


const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/seats/:showId', getBookings);

export default bookingRouter;