const { status } = require('express/lib/response');
const Appointment = require('../../models/appointments');
const ListService = require('../service/appointmets-service');
const UserModel = require('../../models/users');
const appointmetsService = require('../service/appointmets-service');

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
      const {name, doctor, date, complaint} = req.body;      
      const listData = await ListService.createNewList(name, doctor, date, complaint, refreshToken);        
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
    const {refreshToken} = req.cookies;
    console.log('ТОООООООКЕН', refreshToken);     
    const bodyId = req.query._id;    
    let result = await ListService.updateOneList(bodyId, req.body, refreshToken);
    console.log('3')
    res.send(result);  
   } catch (e) {
     console.log('wrong');
   }   
};

module.exports.deleteAppointment = (req, res) => {
  if (!req.query._id) {
    res.status(422).send('Id is not defiend'); 
  } 
  const queryId = req.query._id;  
  Appointment.deleteOne({_id: queryId}).then(result => {
    res.status(200).send('success!')      
  });
};