const Match = require("../models/match");
const jwt = require("jsonwebtoken");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const { model } = require("mongoose");

exports.getMatches = async (req, res) => {
    let fromDate = new Date(-8640000000000000); //they aren't looking at code right? yes lol
    let toDate = new Date(8640000000000000);

    if (req.query.hasOwnProperty('fromDate'))
        fromDate = new Date(req.query.fromDate);
    if (req.query.hasOwnProperty('toDate'))
        toDate = new Date(req.query.toDate);
        
    const matches = await Match.find({
        "dateTime": {$gte: fromDate, $lte: toDate}
    }).populate("firstTeam secondTeam dateTime");
    res.send(matches);
}

exports.getFutureMatches = async (req, res) => {    
    const matches = await Match.find({
        'dateTime': { $gte: Date.now()}
    }).populate("firstTeam secondTeam dateTime");
    res.send(matches);
}

exports.getMatch = async (req, res) => {
    try{
        const match = await Match.findById(req.params.id).populate("stadium referee firstLinesman secondLinesman firstTeam secondTeam");
        if (!match)
            throw Error("Match not found");
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

exports.deleteMatch = catchAsync(async (req, res, next) => {
    
    let match = req.params.id;
    match = await Match.findById(match);
    if(!match) throw new AppError('This match does not exists.',401);

    await match.remove({'_id':match});

    res.status(200).json({
        success: 'true'
    });
});

exports.updateMatch = catchAsync(async (req, res, next) => {
    
    let match = req.params.id;
    match = await Match.findById(match);
    if(!match) throw new AppError('This match does not exists.',401);
    await match.set(req.body);
    await match.save();

    res.status(200).json({
        success: 'true',
        match: match
    });
});