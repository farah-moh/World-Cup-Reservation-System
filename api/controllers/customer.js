const user = require('../models/user');
const ticket = require('../models/ticket');
const match = require('../models/match');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.getReservations = catchAsync(async (req, res, next) => {
    //getting user in route params
    let currUser = req.params.username;
    currUser = await user.findOne({'username': currUser});
    if(!currUser) throw new AppError('This username does not exists.',401);

    let userID = currUser._id;
    // get tickets
    let userTickets = await ticket.find({'buyer': userID}).select('-buyer');

    // get reservations
    let reservations = [];
    for (const element of userTickets) {
        let currMatch =  await match.findById(element.match).select('-seats');
        const tempReservation = currMatch;
        tempReservation["seat"] = element.seatNumber;
        reservations.push(tempReservation);
    }
    res.status(200).json({
        success: 'true',
        reservations: reservations
    });
});