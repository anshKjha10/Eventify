const eventModel = require('../models/event.model');

// create event -> ADMIN only
async function createEvent(req, res){
    try{
        const {title, description, category, date, location, price, maxSeats} = req.body || {};

        if(!title || !date || !location || !maxSeats){
            return res.status(200).json({
                message: "Required fields are missing"
            });
        }

        // check admin
        if(req.user.role !== "admin"){
            return res.status(403).json({
                message: "Only admin can create events!"
            })
        }

        const event = new Event({
            title,
            description,
            category,
            date,
            location,
            prize,
            maxSeats,
            availableSeats : maxSeats,
            createdBy : req.user.id
        });

        await event.save();

        return res.status(201).json({
            message: "Event created successfully",
            event
        });
    } catch (err){
        return res.status(500).json({
            message : "Something went wrong.",
            error : err.message
        });
    }
}

async function getAllEvents(req, res){
    try{

        const events = await Event.find().sort({date : 1});

        return res.status(200).json({
            message: "Events fetched successfully.",
            events
        });

    } catch(err){
        return res.status(200).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}

async function getEventById(req, res){
    try{

        

    } catch(err){

    }
}