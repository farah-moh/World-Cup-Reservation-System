const express = require('express');
const authenticationController = require('./../controllers/authentication');
const staffController = require('./../controllers/staff');

const router = express.Router({mergeParams: true});

//router.use(authenticationController.protectManager);
router.get('/', staffController.getStaff);
router.get('/:id', staffController.getSingleStaff);
router.post('/', staffController.createStaff);

module.exports = router;