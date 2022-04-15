const express = require('express');
const router = express.Router();

const {
  registration,
  signIn,
  signOut, 
  refresh,
  getAllUsers 
} = require('../controllers/user.controller');
 
router.post('/registration',registration);
router.post('/signIn', signIn);
router.post('/signOut', signOut);
router.get('/refresh',refresh);
module.exports = router;
