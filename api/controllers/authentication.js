const user = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.changePassword = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  const currUser = await user.findOne({_id: id});

  if (!currUser) throw new AppError("This user doesn't exist", 400);

  if (!(await currUser.comparePassword(password, currUser.password))) 
      throw new AppError('This password is incorrect', 401);

  currUser.password = newPassword;

  await currUser.save();
  res.status(200).json({
    status: 'Success'
  })
});


/* Services */

const protectService = async req => {
    let token = null;
    //getting token from header & removing bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      throw new AppError('You are not logged in! Please log in to access.', 401);
    }

    //verifying token
    const verified = await promisify(jwt.verify)(token, process.env.JWT_SECRET) // error handling
  
    //finding user from token
    const foundUser = await user.findById(verified._id);
    
    if(!foundUser) {
      throw new AppError('The user belonging to this token no longer exists', 401);
    }
    req.user = foundUser;
  };
  
const protectServiceAdmin = async req => {
    let token = null;
    //getting token from header & removing bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      throw new AppError('You are not logged in! Please log in to access.', 401);
    }
    console.log("I passed here 1");
    //verifying token
    const verified = await promisify(jwt.verify)(token, process.env.JWT_SECRET) // error handling
    console.log(verified);
    //finding user from token
    const foundUser = await user.findById(verified._id);
    
    if(!foundUser) {
      throw new AppError('The user belonging to this token no longer exists', 401);
    }
    if(foundUser.role !== 'admin') {
      throw new AppError('The user is not an admin', 401);
    }
    req.user = foundUser;
  };
  
  const protectServiceManager = async req => {
    let token = null;
    //getting token from header & removing bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      throw new AppError('You are not logged in! Please log in to access.', 401);
    }
    //verifying token
    const verified = await promisify(jwt.verify)(token, process.env.JWT_SECRET) // error handling
    //finding user from token
    const foundUser = await user.findById(verified._id);
    
    if(!foundUser) {
      throw new AppError('The user belonging to this token no longer exists', 401);
    }
    if(foundUser.role !== 'manager') {
      throw new AppError('The user is not a manager', 401);
    }
    if(foundUser.isApproved == false) {
      throw new AppError('The manager is not approved', 401);
    }
    req.user = foundUser;
  };

  exports.protect = catchAsync(async (req, res, next) => {
    await protectService(req);
    next();
  });
  
  exports.protectAdmin = catchAsync(async (req, res, next) => {
    await protectServiceAdmin(req);
    next();
  });

  exports.protectManager = catchAsync(async (req, res, next) => {
    await protectServiceManager(req);
    next();
  });