const Team = require("../models/team");

exports.getTeams = async (req, res) => {
    try {
        const Match = require("../models/match");
        const startDate = new Date(req.body.startDate);
        const matchTime = 90;
        const lower = new Date(startDate.getTime() - matchTime * 60000);
        const upper = new Date(startDate.getTime() + matchTime * 60000);
        const allOccupied = (await Match.find({"dateTime": {$gt: lower, $lt: upper}}).select("-_id firstTeam secondTeam"))
        .map(el => Object.values(el.toObject())).flat();
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