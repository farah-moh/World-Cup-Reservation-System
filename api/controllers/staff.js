const Staff = require("../models/staff");

const { model } = require("mongoose");
const { findById } = require("../models/match");

exports.getStaff = async (req, res) => {
    try {
        const Match = require("../models/match");
        const startDate = new Date(req.body.startDate);
        const matchTime = 90;
        const lower = new Date(startDate.getTime() - matchTime * 60000);
        const upper = new Date(startDate.getTime() + matchTime * 60000);
        
        const allOccupied = await Match.find({"dateTime": {$gt: lower, $lt: upper}}).select("referee firstLinesman secondLinesman");
        const notOccupied = await Staff.find({"_id" : {$nin : allOccupied}});
        res.send(notOccupied);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.getSingleStaff = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
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