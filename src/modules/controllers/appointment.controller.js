const { status } = require('express/lib/response');
const Appointment = require('../../models/appointments');


module.exports.getAllList = (req, res,) => {
  Appointment.find().then(result => {
    res.status(200).send(result);    
  }).catch(err => res.status(404).send(err));
};

module.exports.createAppointment = (req, res) => {
  if (!req.body.patient && !req.body.doctor && !req.body.date && !req.body.complaint) {
    res.status(422).send('one of value is empty');    
  }
  const list = new Appointment(req.body);  
  list.save().then(result => {  
    res.send(list);
  }).catch(err => res.status(404).send(err));
 };

 module.exports.updateAppointment = (req, res) => {
  if (!req.query._id) {
    res.status(422).send('Id is not defiend'); 
  } 
  const bodyId = req.query._id;  
  Appointment.updateOne({_id: bodyId}, req.body).then(result => {
   res.status(200).send(result);
  });
};
 