import { errorSchema } from "inngest/api/schema";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js"

//function to check available seats
const checkSeatsAvailable = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId)
        if (!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        const isSeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isSeatTaken;

    } catch (error) {
        console.log(error.message);
        return false
    }
}

export const createBooking = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {showId, selectedSeats} = req.body;
        const { origin } = req.headers;

        //check if seat is available for selected show
        const isAvailable = await checkSeatsAvailable(showId, selectedSeats)

        if(!isAvailable){
            return res.json({success: false, message: "Selected seats are not available"})
        }

        const showData = await Show.findById(showId).populate('movie');

        //create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        })

        selectedSeats.map((seat)=> {
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified('occupiedSeats');

        await showData.save();

        //stripe payment gateway 
        res.json({success: true, message: "Booked Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

export const getOccupiedSeats = async(req, res)=> {
    try {
        const {showId} = req.params;
        const showData = await Show.findById(showId)

        const occupiedSeats = Object.keys(showData.occupiedSeats)

        res.json({success: true, occupiedSeats})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}