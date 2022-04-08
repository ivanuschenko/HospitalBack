const express = require('express');
const router = express.Router();

const {
  createUser,
  singIn  
} = require('../controllers/user.controller');

router.post('/createUser', createUser);
router.post('/singIn', singIn);

module.exports = router;