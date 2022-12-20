const express = require('express');
const authenticationController = require('./../controllers/authentication');
const matchController = require('./../controllers/match');

const router = express.Router({mergeParams: true});

router.get('/:id', matchController.getMatch);
router.get('/', matchController.getFutureMatches);

//router.use(authenticationController.protectManager); 
router.post('/create', matchController.createMatch);

module.exports = router;