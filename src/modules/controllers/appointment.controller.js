const { status } = require('express/lib/response');
const Appointment = require('../../models/appointments');
const AppointmentService = require('../service/appointmets-service');

module.exports.getAllList = async (req, res, next) => {
  try {   
    const {accessToken} = req.cookies;     
    const listById = await AppointmentService.showById(accessToken);    
    res.send(listById);
  } catch (e) {
    next(e);    
  } 
};

module.exports.createAppointment = async (req, res, next) => {
  try {
    const {accessToken} = req.cookies;
    const { name, doctor, date, complaint } = req.body;      
    const listData = await AppointmentService.createNewList(name, doctor, date, complaint, accessToken);        
    res.send(listData);    
  } catch (e) {
    next(e);    
  } 
};

 module.exports.updateAppointment = async (req, res) => {
  if (!req.query._id) {
    res.status(422).send('Id is not defiend');    
  }
   try {
    const {accessToken} = req.cookies;       
    const bodyId = req.query._id;    
    const result = await AppointmentService.updateOneList(bodyId, req.body, accessToken);    
    res.send(result);  
   } catch (e) {
     console.log(e);
   }   
};

module.exports.deleteAppointment = (req, res) => {
  if (!req.query._id) {
    res.status(422).send('Id is not defiend'); 
  } 
  const queryId = req.query._id;  
  Appointment.deleteOne({_id: queryId}).
    res.status(200).send('success!');
};