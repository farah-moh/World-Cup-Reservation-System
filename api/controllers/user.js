const User = require("../models/user");
const bcrypt = require("bcryptjs");
var passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

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

        const updates = Object.keys(req.body);
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