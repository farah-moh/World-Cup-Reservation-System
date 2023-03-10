const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const Schema = mongoose.Schema;

const matchSchema = mongoose.Schema(
  {
    stadium: {
        type: Schema.ObjectId,
        ref: 'stadium',
        required: true
    },
    firstTeam: {
        type: Schema.ObjectId,
        ref: 'team',
        required: true
    },
    secondTeam: {
        type: Schema.ObjectId,
        ref: 'team',
        required: true
    },
    referee: {
        type: Schema.ObjectId,
        ref: 'staff',
        required: true
    },
    firstLinesman: {
        type: Schema.ObjectId,
        ref: 'staff',
        required: true
    },
    secondLinesman: {
        type: Schema.ObjectId,
        ref: 'staff',
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    seats: [{
        type: String
    }],
  },
  { timestamps: { createdAt: "created_at" } },
);

matchSchema.pre("save", async function (next) {
    const Stadium = require("../models/stadium");
    const Staff = require("../models/staff");
    const Team = require("../models/team");
    const match = this;
    const stadium = match.stadium._id;
    const referee = match.referee._id;
    const firstLinesman = match.firstLinesman._id;
    const secondLinesman = match.secondLinesman._id;
    const firstTeam = match.firstTeam._id;
    const secondTeam = match.secondTeam._id;

    if (new Date(match.dateTime) < Date.now()){         //TODO: Maybe offset that a little?
        throw new AppError("Harry, you are a time traveller!", 400);
    }

    if (firstLinesman.equals(secondLinesman) || firstTeam.equals(secondTeam)){
        throw new AppError("You stupid?", 400);
    }

    const stadiumExists = await Stadium.exists({"_id": stadium});
    if (!stadiumExists){
        throw new AppError("Stadium not found", 400);
    }

    const firstLinesmanExists = await Staff.exists({'_id': firstLinesman, 'type': "linesman"});
    const secondLinesmanExists = await Staff.exists({'_id': secondLinesman, 'type': "linesman"});
    const refereeExists = await Staff.exists({'_id': referee, 'type': "referee"});
    if (!firstLinesmanExists || !secondLinesmanExists || !refereeExists){
        throw new AppError("Staff not found", 400);
    }

    const firstTeamExists = await Team.exists({'_id': firstTeam});
    const secondTeamExists = await Team.exists({'_id': secondTeam});
    if (!firstTeamExists || !secondTeamExists){
        throw new AppError("Team not found", 400);
    }

    const matchTime = 180;
    const lower = new Date(match.dateTime.getTime() - matchTime * 60000);
    const upper = new Date(match.dateTime.getTime() + matchTime * 60000);

    const stadiumOccupied = await Match.exists({
        'stadium' : stadium,
        'dateTime' : {$gt: lower, $lt: upper},
        '_id': {$ne: match._id}
    });
    if (stadiumOccupied){
        throw new AppError("Stadium is occupied", 400);
    }

    const refereeOccupied = await Match.exists({
        'referee' : referee,
        'dateTime' : {$gt: lower, $lt: upper},
        '_id': {$ne: match._id}
    });
    if (refereeOccupied){
        throw new AppError("Referee is occupied", 400);
    }

    const linesmanOccupied = await Match.exists({
        $and:[
            {$or: [{'firstLinesman': firstLinesman},
            {'firstLinesman': secondLinesman}, 
            {'secondLinesman': firstLinesman},
            {'secondLinesman': secondLinesman}],
            'dateTime' : {$gt: lower, $lt: upper}},
            {'_id': {$ne: match._id}}
        ]
    });
    if (linesmanOccupied){
        throw new AppError("Linesman occupied", 400);
    }

    const todayStart = new Date(new Date(match.dateTime).setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date(match.dateTime).setHours(23, 59, 59, 999));

    const teamOccupied = await Match.findOne({
        $and:[
        {$or: [{'firstTeam': firstTeam},
        {'firstTeam': secondTeam}, 
        {'secondTeam': firstTeam},
        {'secondTeam': secondTeam}]},
        {$or: [{'dateTime' : {$gt: lower, $lt: upper}},
            {"dateTime": {$gt: todayStart, $lt: todayEnd}}]},
        {'_id': {$ne: match._id}}
        ]
    });
    if (teamOccupied){
        throw new AppError("Team occupied", 400);
    }

    next();
});

const Match = mongoose.model("match", matchSchema);
module.exports = Match;