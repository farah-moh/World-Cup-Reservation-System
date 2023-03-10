const express = require('express');
const authenticationController = require('./../controllers/authentication');
const customerController = require('./../controllers/customer');

const router = express.Router({mergeParams: true});

router.use(authenticationController.protect);

router.get('/:username/reservations',customerController.getReservations);
router.post('/reserve',customerController.reserveTicket);
router.delete('/cancel-reservation',customerController.cancelTicket);
router.patch('/change-password', authenticationController.changePassword);

module.exports = router;