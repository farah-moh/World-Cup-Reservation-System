const User = require("../models/user");
const bcrypt = require("bcryptjs");
var passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

const UserVerification = require("../models/userVerfication");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // true for 465, false for other ports
  auth: {
    user: "zatoona.montu@gmail.com", // generated ethereal user
    pass: "xnhynwsrygljmuhq", // generated ethereal password
  },
});

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body, verified: false });
    await sendVerificationEmail(user._id, user.email);
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData._id);

    updates.forEach((element) => (user[element] = req.body[element]));

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400);
    res.send({ error: e.toString() });
  }
};

exports.logIn = async (req, res, next) => {
  try {

    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      throw new Error("Email or password is incorrect");
    }
    const ismatch = await bcrypt.compare(req.body.password, user.password);
    if (!ismatch) {
      throw new Error("Email or password is incorrect");
    }

    const token = await user.generateAuthToken();

    return res.json({ token, user });
  } catch (err) {
    return res.status(401).json({ error: err.toString() });
  }
};

// ~~~~~~~~Email Verification~~~~~~~~~~~~//
const sendVerificationEmail = async (_id, email) => {

  //url to be used in the email
  try {
    const currenturl = process.env.CURRENTURL;
    const hashstring = _id.toString() + process.env.JWT_KEY;
    const uniqueString = await bcrypt.hash(hashstring, 8);

    const newVerification = new UserVerification({
      userId: _id,
      email: email,
      uniqueString: uniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000, //6 hrs in ms]
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: " Verify Your Email",
      html: `<p> Verify the email address to complete the signup and login to your account. </p> 
            <p> This Link <b> expires in 6 hours </p> </p> <p> Press <a href=${
              currenturl + "api/user/verify/" + _id + "?hash=" + uniqueString
            }> here </a> to proceed </p>`,
    };

    await newVerification.save();

    const info = await transporter.sendMail(mailOptions, (err) => {
      if (err) {}
    });

  } catch (e) {

  }
};
exports.verify = async (req, res) => {
  try {
    let userId = req.params.userId;
    let uniqueString = req.query.hash;

    const result = await UserVerification.find({ userId });
    const user = await User.findById(userId);
   
    if (result.length > 0) {
      let hasheduniqueString = result[0].uniqueString;
      if (uniqueString === hasheduniqueString) {
        user.verified = true;
        await user.save();
        /*  await User.updateOne({_id:userId},{verified:true})  */
        await UserVerification.deleteOne({ userId });
      }
    }
    // res.redirect(301, "https://zatona.vercel.app/Auth");
    res.status(200).send({success:"true"})
  } catch (e) {
    res.status(400).send(e);
  }
};
