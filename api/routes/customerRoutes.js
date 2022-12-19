const express = require('express');
const authenticationController = require('./../controllers/authentication');
const customerController = require('./../controllers/customer');

const router = express.Router({mergeParams: true});

router.use(authenticationController.protect);

router.get('/:username/reservations',customerController.getReservations);

module.exports = router;