const Appointment = require('../../models/appointments');

module.exports.getAllPatients = (req, res, next) => {
  sickList.find().then(result => {
    res.send(result);    
  });
};
