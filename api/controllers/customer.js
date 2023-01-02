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
        let currMatch =  await match.findById(element.match).populate("firstTeam secondTeam").select('-seats');
        const tempReservation = {...currMatch._doc, ticketId:element._id, seat:element.seatNumber};
        // tempReservation["seat"] = element.seatNumber;
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
    let seats = req.body.seats;
    let threeHours = 1000 * 3600 * 3;

    let currMatch = await match.findById(matchID);
    if(!currMatch) throw new AppError('This match does not exists.',401);
    let date = Date.parse(currMatch.dateTime);

    // get tickets bought by user
    let userTickets = await ticket.find({'buyer': me}).select('match');
    let matchSeats = currMatch.seats;

    // get dates of matches booked by user
    let clashes = 0;
    console.log(date);
    for (const element of userTickets) {
        let tempMatch =  await match.findById(element.match).select('dateTime _id');
        if(tempMatch._id == matchID) continue;
        let tempDate = Date.parse(tempMatch.dateTime);
        console.log(tempDate);
        if(Math.abs(tempDate-date) < threeHours) clashes++;
    }

    if(clashes) {
        return res.status(400).json({
            success: 'false',
            error: 'This reservation clashes with previous reservations'
        });
    }

    seats.forEach(seat => {
        if(matchSeats.includes(seat)) {
            return res.status(400).json({
                success: 'false',
                error: 'This seat is already booked'
            });
        }
    });

    seats.forEach(async (seat) => {
        currMatch.seats.push(seat);
        
        const newTicket = await ticket.create({
            buyer: me,
            match: matchID,
            seatNumber: seat
        });
        
        await newTicket.save();
    });
    await currMatch.save();

    res.status(200).json({
        success: 'true'
    });
});

exports.cancelTicket = catchAsync(async (req, res, next) => {
    //getting user in route params
    let me = req.user._id;
    let currTicket = req.body.ticket;
    let threeDays = 1000 * 3600 * 24 * 3;
    console.log(currTicket)
    currTicket =  await ticket.findById(currTicket);
    if(!currTicket) throw new AppError('This ticket does not exists.',401);
    if(currTicket.buyer.toString() != me) {
        return res.status(400).json({
            success: 'false',
            error: "This ticket doesn't belong to this user"
        });
    }

    let currMatch = await match.findById(currTicket.match);
    let nowDate = new Date();
    let ticketDate = Date.parse(currMatch.dateTime);

    if(ticketDate < nowDate) {
        return res.status(400).json({
            success: 'false',
            error: "This ticket is expired. Match has already passed."
        });
    }

    if(ticketDate - nowDate <= threeDays) {
        return res.status(400).json({
            success: 'false',
            error: "You can't cancel now. Match is in 3 days (or less)"
        });
    }

    currMatch.seats = currMatch.seats.filter(item => item != currTicket.seatNumber);

    await currMatch.save();

    await ticket.findByIdAndDelete(currTicket._id);


    res.status(200).json({
        success: 'true'
    });
});