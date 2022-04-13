const express = require('express');
const router = express.Router();

const {
  registration,
  signIn,  
} = require('../controllers/user.controller');
 
router.post('/registration', registration);
router.post('/signIn', signIn);

module.exports = router;
