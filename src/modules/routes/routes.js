const express = require('express');
const router = express.Router();

const {
  createUser,
  singIn  
} = require('../controllers/user.controller');

const {
  getAllPatients
} = require('../controllers/appointment.controller');

router.post('/createUser', createUser);
router.post('/singIn', singIn);

router.get('/allPatients', getAllPatients);

module.exports = router;