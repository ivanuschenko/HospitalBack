const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentScheme = new Schema({
  patient: String,
  doctor: String,
  date: String,
  complaint: String,
  userID: String
});

module.exports = Appointment = mongoose.model('appointments', appointmentScheme );
