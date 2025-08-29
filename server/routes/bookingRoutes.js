import express from 'express';
import { createBooking, getOccupiedSeats } from '../controllers/bookingController.js';

const boookingRouter = express.Router();

boookingRouter.post('/create', createBooking);
boookingRouter.post('/seats/:showId', getOccupiedSeats);

export default boookingRouter;