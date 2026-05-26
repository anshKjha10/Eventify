const eventModel = require('../models/event.model');

// create event -> ADMIN only
async function createEvent(req, res){
    try{
        const { title, description, category, date, location, prize, maxSeats } = req.body || {};
        let parsedLocation = location;

        if (typeof location === "string") {
            try {
                parsedLocation = JSON.parse(location);
            } catch (err) {
                parsedLocation = location;
            }
        }

        const hasLocation =
            parsedLocation &&
            typeof parsedLocation === "object" &&
            parsedLocation.city &&
            parsedLocation.country;

        if (!title || !category || !date || !hasLocation || !maxSeats) {
            return res.status(400).json({
                message: "Required fields are missing"
            });
        }

        // check admin
        if(req.user.role !== "admin"){
            return res.status(403).json({
                message: "Only admin can create events!"
            })
        }

        const event = new eventModel({
            title,
            description,
            category,
            date,
            location: parsedLocation,
            prize,
            maxSeats,
            availableSeats: maxSeats,
            image: req.file ? `/uploads/${req.file.filename}` : undefined,
            createdBy: req.user.id
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

        const events = await eventModel.find().sort({date : 1});

        return res.status(200).json({
            message: "Events fetched successfully.",
            events
        });

    } catch(err){
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}

async function getEventById(req, res){
    try{

        const eventId = req.params.id;
        const event = await eventModel.findById(eventId);

        if(!event){
            return res.status(404).json({
                message: "Event not found!",
            });
        }

        return res.status(200).json({
            message: "Event fetched successfully",
            event
        });

    } catch(err){
        return res.status(500).json({
            message: "Something went wrong",
            error : err.message
        });
    }
}

async function updateEvent(req, res){
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({
                message: "Only admin can update events."
            })
        }

        const eventId = req.params.id;
        const allowedFields = [
            "title",
            "description",
            "category",
            "date",
            "location",
            "prize",
            "maxSeats"
        ];

        const updateOps = { $set: {} };

        for (const field of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                const value = req.body[field];
                if (value !== undefined && value !== "") {
                    updateOps.$set[field] = value;
                }
            }
        }

        if (typeof updateOps.$set.location === "string") {
            try {
                updateOps.$set.location = JSON.parse(updateOps.$set.location);
            } catch (err) {
                delete updateOps.$set.location;
            }
        }

        if (updateOps.$set.location && typeof updateOps.$set.location === "object") {
            const { city, country, address } = updateOps.$set.location;
            delete updateOps.$set.location;

            if (city !== undefined && city !== "") {
                updateOps.$set["location.city"] = city;
            }
            if (country !== undefined && country !== "") {
                updateOps.$set["location.country"] = country;
            }
            if (address !== undefined && address !== "") {
                updateOps.$set["location.address"] = address;
            }
        }

        if (req.file) {
            updateOps.$set.image = `/uploads/${req.file.filename}`;
        }

        if (Object.keys(updateOps.$set).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided to update."
            });
        }

        const event = await eventModel.findByIdAndUpdate(eventId, updateOps, { new : true });

        if(!event){
            return res.status(404).json({
                message: "Event not found!"
            });
        }

        return res.status(200).json({
            message: "Event updated successfully.",
            event
        });

    } catch(err) {
        return res.status(500).json({
            message: "Something is wrong.",
            error: err.message 
        });
    }
}

async function deleteEvent(req, res){
    try{

        if(req.user.role !== "admin"){
            return res.status(403).json({
                message: "Only admin can delete events."
            });
        }

        const eventId = req.params.id;
        const event = await eventModel.findByIdAndDelete(eventId);

        if(!event){
            return res.status(404).json({
                message: "Event not found"
            });
        }

        return res.status(200).json({
            message: "Event deleted successfully."
        })

    } catch(err) {
        return res.status(500).json({
            message: "Something went wrong.",
            error: err.message
        });
    }
}

async function getMyEvents(req, res){
    try{

        const events = await eventModel.find({
            createdBy : req.user.id
        }).sort({ createdAt : -1 });

        return res.status(200).json({
            message: "Your events fetched successfully!",
            events
        });

    } catch(err) {

        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });

    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getMyEvents
}