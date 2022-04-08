const Appointment = require('../../models/appointments');

module.exports.getAllPatients = (req, res, next) => {
  sickList.find().then(result => {
    res.send(result);    
  });
};

module.exports.createAppointment = (req, res, next) => {
  const list = new sickList(req.body);
  console.log(list)
  list.save().then(result => {  
    res.send(list);
  }).catch(err => console.log(err));
 };
