const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const ticketSchema = mongoose.Schema(
  {
    buyer: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    match: {
        type: Schema.ObjectId,
        ref: 'match',
        required: true
    },
    seatNumber: {
        type: Integer,
        required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);


const Ticket = mongoose.model("ticket", ticketSchema);
module.exports = Ticket;

