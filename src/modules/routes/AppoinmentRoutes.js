const express = require('express');
const router = express.Router();

const {
  getAllList,
  createAppointment,
  updateAppointment
 
} = require('../controllers/appointment.controller');

router.get('/allList', getAllList);
router.post('/createAppointment', createAppointment);
router.patch('/updateAppointment', updateAppointment);

module.exports = router;