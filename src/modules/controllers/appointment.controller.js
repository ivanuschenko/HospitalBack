const { status } = require('express/lib/response');
const Appointment = require('../../models/appointments');


module.exports.getAllList = (req, res,) => {
  Appointment.find().then(result => {
    res.status(200).send(result);    
  }).catch(err => res.status(404).send(err));;
};

module.exports.createAppointment = (req, res) => {
  const list = new Appointment(req.body);
  if (!list.name || !list.password ) {
    res.send('status 404 one of values is empty');     
  }  
  list.save().then(result => {  
    res.send(list);
  }).catch(err => res.status(404).send(err));
 };