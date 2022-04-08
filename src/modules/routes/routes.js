const express = require('express');
const router = express.Router();

const {
  createUser,
  singIn  
} = require('../controllers/user.controller');

const {
  getAllPatients,
  createAppointment
  
} = require('../controllers/appointment.controller');

router.post('/createUser', createUser);
router.post('/singIn', singIn);

router.get('/allPatients', getAllPatients);
router.post('/createAppointment', createAppointment);

module.exports = router;