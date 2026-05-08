const regModel = require('../models/registration.model');
const eventModel = require('../models/event.model');

async function registerForEvent(req, res){
    try{

        const userId = req.user.id;
        const eventId = req.params.eventId;

        const event = await eventModel.findById(eventId);

        if(!event){
            return res.status(404).json({
                message: "Event not found!"
            });
        }

        const existingRegistration = await regModel.findOne({
            user: userId,
            event: eventId
        });

        if(existingRegistration){
            return res.status(400).json({
                message: "User already registered for this event."
            });
        }

        if(event.availableSeats <= 0){
            return res.status(400).json({
                message: "No seats available for this event."
            });
        }

        const registration = new regModel({
            user: userId,
            event: eventId
        });

        await registration.save();

        event.availableSeats -= 1;
        await event.save();

        return res.status(201).json({
            message: "Registration successful",
            registration
        });

    } catch(err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}