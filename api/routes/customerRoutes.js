const express = require('express');
const authenticationController = require('./../controllers/authentication');
const customerController = require('./../controllers/customer');

const router = express.Router({mergeParams: true});

router.use(authenticationController.protect);

router.get('/reservations',customerController.getReservations);