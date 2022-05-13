const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

// Signup route via post request
router.post('/signup',
  userController.checkUser,
  userController.createUser,
  cookieController.initSession,
  cookieController.generateSSID,
  cookieController.setCookie,
  (req, res) => {
  // If an error has occured during signup:
    if (res.locals.error) {
      return res.status(400).json(res.locals.error);
    }
    console.log('reached end of signup route');
    return res.status(200).json(res.locals.user);
  });

// Login route via post request
router.post('/login',
  userController.verifyUser,
  cookieController.generateSSID,
  cookieController.setCookie,
  (req, res) => {
    if (res.locals.error) {
      return res.status(400).json(res.locals.error);
    }
    console.log('reached end of login route');
    return res.status(200).json(res.locals.user);
  });

// delete cookies via delete method?
router.get('/logout',
  cookieController.verifySession,
  cookieController.generateSSID,
  (req, res) => {
    if (res.locals.error) {
      return res.status(400).json(res.locals.error);
    }
    console.log('logged out of session');
    return res.status(200).send('You have been logged out of hire.me');
  });

module.exports = router;
