const { status } = require('express/lib/response');
const Appointment = require('../../models/appointments');
const ListService = require('../service/appointmets-service');
const UserModel = require('../../models/users');

module.exports.getAllList = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;
    const listById = await ListService.showById(refreshToken);
    res.send(listById);
  } catch (e) {
    next(e);
  } 
};

module.exports.createAppointment = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;
    const {patient, doctor, date, complaint} = req.body;
    const listData = await ListService.createNewList(patient, doctor, date, complaint, refreshToken);    
    res.send(listData);    
  } catch (e) {
    next(e); 
  } 
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

module.exports.deleteAppointment = (req, res) => {
  if (!req.query._id) {
    res.status(422).send('Id is not defiend'); 
  } 
  const queryId = req.query._id;  
  sickList.deleteOne({_id: queryId}).then(result => {
    res.status(200).send('success!')      
  });
};