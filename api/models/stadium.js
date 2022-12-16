const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const stadiumSchema = mongoose.Schema(
  {
    length: {
      type: Integer,
      required: true
    },
    width: {
        type: Integer,
        required: true
    },
    rows: {
        type: Integer,
        required: true
    },
    seatsPerRow: {
        type: Integer,
        required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);


const Stadium = mongoose.model("stadium", stadiumSchema);
module.exports = Stadium;


