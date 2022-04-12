const express = require('express');
const router = express.Router();

const {
  createUser,
  signIn  
} = require('../controllers/user.controller');

router.post('/createUser', createUser);
router.post('/signIn', signIn);
module.exports = router;
