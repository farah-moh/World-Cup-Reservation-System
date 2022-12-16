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
    }
  },
  { timestamps: { createdAt: "created_at" } }
);


const Match = mongoose.model("match", matchSchema);
module.exports = Match;


