const express = require('express');
const router = express.Router();
const checkAuths = require('../middleware/check-auth');
const auth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

router.post('/signup', UserController.createUser);
router.get('/:id', UserController.getUser);
router.put('', auth.userAuth,UserController.updateUser);


router.post('/login', UserController.logIn);
router.get("/verify/:userId",UserController.verify)

 
module.exports = router;