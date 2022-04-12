const express = require('express');
const router = express.Router();

const {
  createUser,
  singIn  
} = require('../controllers/user.controller');

router.post('/createUser', createUser);
router.post('/signIn', signIn);
module.exports = router;