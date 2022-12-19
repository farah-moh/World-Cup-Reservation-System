const express = require('express');
const authenticationController = require('./../controllers/authentication');
const matchController = require('./../controllers/match');

const router = express.Router({mergeParams: true});

router.get('/match/:id', matchController.getMatch);
router.get('/match', matchController.getFutureMatches);

//router.use(authenticationController.protectManager); //TODO: change to protectManager
router.post('/match', matchController.createMatch);

module.exports = router;