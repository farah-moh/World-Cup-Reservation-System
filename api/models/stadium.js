const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const stadiumSchema = mongoose.Schema(
  {
    rows: {
        type: Number,
        required: true
    },
    seatsPerRow: {
        type: Number,
        required: true
    },
    name: {
      unique: true,
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);


const Stadium = mongoose.model("stadium", stadiumSchema);
module.exports = Stadium;


