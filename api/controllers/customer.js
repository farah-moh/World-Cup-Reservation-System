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

exports.reserveTicket = catchAsync(async (req, res, next) => {
    //getting user in route params
    let me = req.user._id;
    let matchID = req.body.matchID;
    let seat = req.body.seat;

    let currMatch = await match.findById(matchID);
    if(!currMatch) throw new AppError('This match does not exists.',401);
    let date = currMatch.dateTime;

    // get tickets bought by user
    let userTickets = await ticket.find({'buyer': me}).select('match');
    let matchSeats = currMatch.seats;

    // get dates of matches booked by user
    let clashes = 0;
    for (const element of userTickets) {
        let tempMatch =  await match.findById(element.match).select('dateTime _id');
        if(tempMatch.dateTime.toString() == date) clashes++;
    }

    if(clashes) {
        return res.status(400).json({
            success: 'false',
            error: 'This reservation clashes with previous reservations'
        });
    }

    if(matchSeats.includes(seat)) {
        return res.status(400).json({
            success: 'false',
            error: 'This seat is already booked'
        });
    }

    currMatch.seats.push(seat);
    await currMatch.save();

    const newTicket = await ticket.create({
        buyer: me,
        match: matchID,
        seatNumber: seat
    });

    await newTicket.save();

    res.status(200).json({
        success: 'true'
    });
});