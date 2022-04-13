const express = require('express');
const router = express.Router();

const {
  getAllList,
  createAppointment
 
} = require('../controllers/appointment.controller');

router.get('/allList', getAllList);
router.post('/createAppointment', createAppointment);

module.exports = router;