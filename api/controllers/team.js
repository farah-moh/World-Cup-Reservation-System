const Team = require("../models/team");

exports.getTeams = async (req, res) => {
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
            allOccupied = (await Match.find({"dateTime": {$gt: lower, $lt: upper}, "_id" : {$ne : excludedId}}).select("-_id firstTeam secondTeam"))
            .map(el => Object.values(el.toObject())).flat();
        }
        else{
            allOccupied = (await Match.find({"dateTime": {$gt: lower, $lt: upper}}).select("-_id firstTeam secondTeam"))
            .map(el => Object.values(el.toObject())).flat();
        }
        
        const unoccupied = await Team.find({"_id" : {$nin : allOccupied}});
        res.send(unoccupied);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team)
            throw Error("Team not found");
        res.send(team);
    } catch(err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.createTeam = async (req, res) => {
    try{
        const staff = await Team.create(req.body);
        return res.send(staff);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}