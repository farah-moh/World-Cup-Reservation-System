const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const stadiumSchema = mongoose.Schema(
  {
    length: {
      type: Number,
      required: true
    },
    width: {
        type: Number,
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    seatsPerRow: {
        type: Number,
        required: true
    },
    name: {
      type: String
    }
  },
  { timestamps: { createdAt: "created_at" } }
);


const Stadium = mongoose.model("stadium", stadiumSchema);
module.exports = Stadium;


