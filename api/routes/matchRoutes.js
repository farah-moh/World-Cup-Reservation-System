const express = require('express');
const authenticationController = require('./../controllers/authentication');
const matchController = require('./../controllers/match');

const router = express.Router({mergeParams: true});

router.get('/:id', matchController.getMatch);
router.get('/', matchController.getMatches);

router.use(authenticationController.protectManager); 
router.post('/create', matchController.createMatch);
router.patch('/edit/:id', matchController.updateMatch);
router.delete('/:id', matchController.deleteMatch);

module.exports = router;