const express = require('express');
const router = express.Router();
const checkAuths = require('../middleware/check-auth');
const auth = require('../middleware/check-auth');

const userController = require('../controllers/user');

router.post('/signup', userController.createUser);
router.get('/:id', userController.getUser);
router.put('', auth.userAuth,userController.updateUser);


router.post('/login', userController.logIn);
router.get("/verify/:userId",userController.verify)

 
module.exports = router;