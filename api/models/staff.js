const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const staffSchema = mongoose.Schema(
  {
    name: {
      unique: true,
      type: String,
      required: true
    },
    type: {
        type: String,
        enum: {values: ['referee','linesman','admin']},
        required: true
      }
  },
  { timestamps: { createdAt: "created_at" } }
);


const Staff = mongoose.model("staff", staffSchema);
module.exports = Staff;