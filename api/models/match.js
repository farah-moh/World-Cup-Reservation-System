const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
        //required: true
    },
    secondTeam: {
        type: Schema.ObjectId,
        ref: 'team',
        //required: true
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
        type: Number
    }],
  },
  { timestamps: { createdAt: "created_at" } },
);

matchSchema.pre("save", async function (next) {
    const Stadium = require("../models/stadium");
    const Staff = require("../models/staff");
    const match = this;
    const stadium = match.stadium._id;
    const referee = match.referee._id;
    const firstLinesman = match.firstLinesman._id;
    const secondLinesman = match.secondLinesman._id;

    if (new Date(match.dateTime) < Date.now()){         //TODO: Maybe offset that a little?
        throw new Error ("Harry, you are a time traveller!");
    }

    if (firstLinesman.equals(secondLinesman)){
        throw new Error ("You stupid?");
    }

    const stadiumExists = await Stadium.exists({"_id": stadium});
    if (!stadiumExists){
        throw new Error ("Stadium not found");
    }

    const firstLinesmanExists = await Staff.exists({'_id': firstLinesman, 'type': "linesman"});
    const secondLinesmanExists = await Staff.exists({'_id': secondLinesman, 'type': "linesman"});
    const refereeExists = await Staff.exists({'_id': referee, 'type': "referee"});
    if (!firstLinesmanExists || !secondLinesmanExists || !refereeExists){
        throw new Error ("Staff not found");
    }

    const matchTime = 90;
    const lower = new Date(match.dateTime.getTime() - matchTime * 60000);
    const upper = new Date(match.dateTime.getTime() + matchTime * 60000);

    const stadiumOccupied = await Match.exists({
        'stadium' : stadium,
        'dateTime' : {$gt: lower, $lt: upper} 
    });
    if (stadiumOccupied){
        throw new Error ("Stadium is occupied");
    }

    const refereeOccupied = await Match.exists({
        'referee' : referee,
        'dateTime' : {$gt: lower, $lt: upper} 
    });
    if (refereeOccupied){
        throw new Error ("Referee is occupied");
    }

    const linesmanOccupied = await Match.exists({
        $or: [{'firstLinesman': firstLinesman},
        {'firstLinesman': secondLinesman}, 
        {'secondLinesman': firstLinesman},
        {'secondLinesman': secondLinesman}],
        'dateTime' : {$gt: lower, $lt: upper} 
    });
    if (linesmanOccupied){
        throw new Error ("Linesman occupied");
    }

    //TODO: team check
    next();
});

const Match = mongoose.model("match", matchSchema);
module.exports = Match;