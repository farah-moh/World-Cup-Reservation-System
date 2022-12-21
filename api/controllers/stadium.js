const Stadium = require("../models/stadium");
const { model } = require("mongoose");

exports.getStadia = async (req, res) => {
    try{
        const Match = require("../models/match");
        const startDate = new Date(req.body.startDate);
        const matchTime = 90;
        const lower = new Date(startDate.getTime() - matchTime * 60000);
        const upper = new Date(startDate.getTime() + matchTime * 60000);
        
        const allOccupied = await Match.find({"dateTime": {$gt: lower, $lt: upper}}).select("stadium").distinct("stadium");
        const unoccupied = await Stadium.find({'_id' : {$nin : allOccupied}});
        res.send(unoccupied);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.getStadium = async (req, res) => {
    try{
        const stadium = await Stadium.findById(req.params.id);
        if (!stadium)
            throw Error("Stadium not found");
        res.send(stadium);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.createStadium = async (req, res) => {
    try{
        const stadium = await Stadium.create(req.body);
        return res.send(stadium);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}