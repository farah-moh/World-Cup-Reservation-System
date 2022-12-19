const express = require('express');
const authenticationController = require('./../controllers/authentication');
const adminController = require('./../controllers/admin');

const router = express.Router({mergeParams: true});

router.use(authenticationController.protectAdmin);

router.get('/user',adminController.getUsers);
router.get('/unapproved',adminController.getUnapprovedUsers);
router.patch('/:username/approve',adminController.approveUser);
router.delete('/:username/delete',adminController.deleteUser);

module.exports = router;
