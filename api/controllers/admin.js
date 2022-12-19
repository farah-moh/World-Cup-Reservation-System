const user = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.approveUser = catchAsync(async (req, res, next) => {
    //getting user in route params
    let currUser = req.params.username;
    currUser = await user.findOneAndUpdate({'username': currUser}, { isApproved: true });
    if(!currUser) throw new AppError('This username does not exists.',401);

    res.status(200).json({
        success: 'true'
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    //getting user in route params
    let currUser = req.params.username;
    currUser = await user.findOne({'username': currUser});
    if(!currUser) throw new AppError('This username does not exists.',401);

    await user.remove({'username':req.params.username});

    res.status(200).json({
        success: 'true'
    });
});

exports.getUnapprovedUsers = catchAsync(async (req, res, next) => {
    //getting user in route params
    const users = await user.find({'isApproved': false});

    res.status(200).json({
        success: 'true',
        user: users
    });
});

exports.getUsers = catchAsync(async (req, res, next) => {
    //getting user in route params
    const users = await user.find();

    res.status(200).json({
        success: 'true',
        user: users
    });
});