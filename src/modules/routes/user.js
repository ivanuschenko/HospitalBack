const express = require('express');
const router = express.Router();

const {
  registration,
  signIn,
  signOut, 
  refresh, 
} = require('../controllers/user.controller');
 
router.post('/registration',registration);
router.post('/signIn', signIn);
router.get('/signOut', signOut);
router.get('/refresh',refresh);
module.exports = router;
