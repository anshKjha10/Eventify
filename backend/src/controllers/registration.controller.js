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

async function cancelRegistration(req, res){
    try{

        const eventId = req.params.eventId;
        const userId = req.user.id;

        const registration = await regModel.findOneAndDelete({
            user: userId,
            event: eventId
        });

        if(!registration){
            return res.status(404).json({
                message: "Registration not found!"
            });
        }

        const event = await eventModel.findById(eventId);
        if(event){
            event.availableSeats += 1;
            await event.save();
        }

        return res.status(200).json({
            message: "Registration cancelled successfully",
            registration
        });

    } catch(err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

async function getRegistrations(req, res){
    try{

        const userId = req.user.id;

        const registrations = await regModel.find({user: userId}).populate("event");

    } catch(err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

async function getRegistrationsByUser(req, res){
    try{



    } catch(err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}