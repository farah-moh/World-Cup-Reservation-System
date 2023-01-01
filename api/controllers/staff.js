const Staff = require("../models/staff");

const { model } = require("mongoose");
const { findById } = require("../models/match");

exports.getStaff = async (req, res) => {
    try {
        const Match = require("../models/match");
        // var startDate = new Date(req.query.startDate)
        // startDate.setHours(startDate.getHours()+2)
        const startDate = new Date(req.query.startDate);
        const matchTime = 180;
        const lower = new Date(startDate.getTime() - matchTime * 60000);
        const upper = new Date(startDate.getTime() + matchTime * 60000);

        let allOccupied = null
        if (req.query.hasOwnProperty('excludedId')){
            const excludedId = req.query.excludedId
            allOccupied = (await Match.find({"dateTime": {$gt: lower, $lt: upper}, "_id" : {$ne : excludedId}}).select("-_id referee firstLinesman secondLinesman"))
            .map(el => Object.values(el.toObject())).flat();
        }
        else{
            allOccupied = (await Match.find({"dateTime": {$gt: lower, $lt: upper}}).select("-_id referee firstLinesman secondLinesman"))
            .map(el => Object.values(el.toObject())).flat();    
        }
        
        const unoccupied = await Staff.find({"_id" : {$nin : allOccupied}});
        res.send(unoccupied);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.getSingleStaff = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff)
            throw Error("Staff not found");
        res.send(staff);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.createStaff = async (req, res) => {
    try{
        const staff = await Staff.create(req.body);
        return res.send(staff);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}