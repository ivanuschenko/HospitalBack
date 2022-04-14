const express = require('express');
const router = express.Router();

const {
  registration,
  signIn,
  signOut  
} = require('../controllers/user.controller');
 
router.post('/registration',registration);
router.post('/signIn', signIn);
router.post('/signOut', signOut);

module.exports = router;
