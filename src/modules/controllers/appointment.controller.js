const { status } = require('express/lib/response');
const Appointment = require('../../models/appointments');


module.exports.getAllList = (req, res,) => {
  Appointment.find().then(result => {
    res.status(200).send(result);    
  }).catch(err => res.status(404).send(err));;
};

module.exports.createAppointment = (req, res) => {
  if (!req.body.name && !req.body.password ) {
    res.status(422).send('one of values is empty');    
  }  
  const list = new Appointment(req.body);  
  list.save().then(result => {  
    res.send(list);
  }).catch(err => res.status(404).send(err));
 };

 
