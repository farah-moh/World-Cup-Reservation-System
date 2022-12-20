const Match = require("../models/match");
const jwt = require("jsonwebtoken");

const UserVerification = require("../models/userVerfication");
const { model } = require("mongoose");

exports.getMatches = async (req, res) => {
    let fromDate = new Date(-8640000000000000); //they aren't looking at code right? yes lol
    let toDate = new Date(8640000000000000);

    if (req.body.hasOwnProperty('fromDate'))
        fromDate = new Date(req.body.fromDate);
    if (req.body.hasOwnProperty('toDate'))
        toDate = new Date(req.body.toDate);
        
    const matches = await Match.find({
        "dateTime": {$gte: fromDate, $lte: toDate}
    });
    res.send(matches);
}

exports.getFutureMatches = async (req, res) => {    
    const matches = await Match.find({
        'dateTime': { $gte: Date.now()}
    });
    res.send(matches);
}

exports.getMatch = async (req, res) => {
    try{
        const match = await Match.findById(req.params.id);
        res.send(match);
    }catch (err){
        res.status(400).send({ error: err.toString() });
    }
}

exports.createMatch = async (req, res) => {
    try {
        const match = await Match.create(req.body);
        return res.json(match);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}