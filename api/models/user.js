const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
    },
    role: {
      type: String,
      enum: {values: ['manager','customer','admin']},
      default:'customer'
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  { timestamps: { createdAt: "created_at" } }
);

userSchema.statics.findByCredentials = async (email, password) => {
  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("unable to login");
    }
    console.log("first");
    /* if( !user.verified){
      throw new Error('unable to login as user is not verified')
    } */
    const ismatch = await bcrypt.compare(password, user.password);
    console.log(
      "🚀 ~ file: user.js ~ line 103 ~ userSchema.statics.findByCredentials=async ~ ismatch",
      ismatch
    );
    if (!ismatch) {
      throw new Error("unable to login");
    }

    return user;
  } catch (error) {
    console.log(
      "🚀 ~ file: user.js ~ line 106 ~ userSchema.statics.findByCredentials=async ~ error",
      error
    );
    return error;
  }
};

userSchema.methods.comparePassword = async function (inputPassword, userPassword) {
  return await bcrypt.compare(inputPassword, userPassword);
}

userSchema.methods.toJSON = function () {
  const user = this;
  const userobject = user.toObject();
  delete userobject.password;
  return userobject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY, {
    expiresIn: "24h", // expires in 365 days
  });
  return token;
};

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    console.log("her");
    if (user.isModified("password")) {
      console.log(2);
      user.password = await bcrypt.hash(user.password, 8);
    }
    console.log(4);
    next();
  } catch (error) {
    console.log("🚀 ~ file: user.js ~ line 136 ~ error", error);

    next();
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;
