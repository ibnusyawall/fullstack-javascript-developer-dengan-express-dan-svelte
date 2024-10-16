// import express
const express = require('express')

// init express router
const router = express.Router();

const verifyToken = require('../middlewares/auth');

// import register controller
const registerController = require('../controllers/RegisterController');
const loginController = require('../controllers/LoginController');
const userController = require('../controllers/UserController');

// import validate register
const { validateRegister, validateLogin } = require('../utils/validators/auth');
const { validateUser } = require('../utils/validators/user');

// define route for auth
router.post('/register', validateRegister, registerController.register);
router.post('/login', validateLogin, loginController.login);

// define route for user resources
router.get('/admin/users', verifyToken, userController.findUsers);
router.post('/admin/users', verifyToken, validateUser, userController.createUser);
router.get('/admin/users/:id', verifyToken, userController.findUserById);
router.put('/admin/users/:id', verifyToken, validateUser, userController.updateUser);
router.delete('/admin/users/:id', verifyToken, userController.deleteUser);

// export router
module.exports = router
