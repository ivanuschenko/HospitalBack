const express = require('express');
const router = express.Router();

const {
  getAllList,
  createAppointment,
  updateAppointment,
  deleteAppointment
 
} = require('../controllers/appointment.controller');

router.get('/allList', getAllList);
router.post('/createAppointment', createAppointment);
router.patch('/updateAppointment', updateAppointment);
router.delete('/deleteAppointment', deleteAppointment);

module.exports = router;