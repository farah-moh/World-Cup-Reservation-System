const express = require('express');
const authenticationController = require('./../controllers/authentication');
const teamController = require('./../controllers/team');

const router = express.Router({mergeParams: true});

router.use(authenticationController.protectManager);
router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeam);
router.post('/', teamController.createTeam);

module.exports = router;