const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const teamSchema = mongoose.Schema(
  {
    name: {
      unique: true,
      type: String,
      required: true
    },
    flag: {
      type: String
    }
  },
  { timestamps: { createdAt: "created_at" } }
);


const Team = mongoose.model("team", teamSchema);
module.exports = Team;


