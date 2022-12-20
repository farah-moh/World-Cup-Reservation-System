const express = require('express');
const authenticationController = require('./../controllers/authentication');
const stadiumController = require('./../controllers/stadium');

const router = express.Router({mergeParams: true});

//router.use(authenticationController.protectManager);
router.get('/', stadiumController.getStadia);
router.get('/:id', stadiumController.getStadium);
router.post('/', stadiumController.createStadium);

module.exports = router;