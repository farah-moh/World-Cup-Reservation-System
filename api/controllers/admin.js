const user = require('../models/user');
const catchAsync = require('../utils/catchAsync');


exports.getUsers = catchAsync(async (req, res, next) => {
    //getting user in route params
    const users = await user.find();

    res.status(200).json({
        success: 'true',
        user: users
    });
});