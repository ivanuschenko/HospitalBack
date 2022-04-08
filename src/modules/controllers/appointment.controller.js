const Appointment = require('../../models/appointments');

module.exports.getAllPatients = (req, res, next) => {
  Appointment.find().then(result => {
    res.send(result);    
  });
};

module.exports.createAppointment = (req, res, next) => {
  const list = new Appointment(req.body);  
  list.save().then(result => {  
    res.send(list);
  }).catch(err => console.log(err));
 };

 module.exports.updateAppointment = (req, res, next) => {
  const bodyId = req.query._id;  
  Appointment.updateOne({_id: bodyId}, req.body).then(result => {
    Appointment.find().then(result => {
      res.send(result);
    });
  });
};
