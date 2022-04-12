const { status } = require('express/lib/response');
const Appointment = require('../../models/appointments');


module.exports.getAllList = (req, res,) => {
  Appointment.find().then(result => {
    res.status(200).send(result);    
  }).catch(err => res.status(404).send(err));
};
