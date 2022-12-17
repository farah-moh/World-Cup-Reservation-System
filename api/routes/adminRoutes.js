const express = require('express');
const authenticationController = require('./../controllers/authentication');
const adminController = require('./../controllers/admin');

const router = express.Router({mergeParams: true});

router.use(authenticationController.protectAdmin);

router.get('/user',adminController.getUsers);

module.exports = router;
