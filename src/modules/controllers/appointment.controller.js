const appointmentService = require('../service/appointmets-service');
const tokenModel = require('../../models/token');
const tokenService = require('../service/token-service');

module.exports.getAllList = async (req, res, next) => {     
  try {
    const { accessToken } = req.cookies;     
    const listById = await appointmentService.showById(accessToken);         
    res.send(listById);    
  } catch (e) {    
    next(e);    
  } 
};

module.exports.createAppointment = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    const { name, doctor, date, complaint } = req.body;
    const listData = await appointmentService.createNewList(
      name,
      doctor,
      date,
      complaint,
      accessToken
    );
    res.send(listData);
  } catch (e) {
    next(e);
  }
};

module.exports.updateAppointment = async (req, res, next) => {  
  if (!req.body.id) {
    res.status(422).send('Id is not defiend');
  }     
  try {
    const { accessToken } = req.cookies;
    const bodyId = req.body.id;        
    const result = await appointmentService.updateOneList(
      bodyId,
      req.body,
      accessToken
    );         
    res.send(result);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteAppointment = async (req, res) => { 
  try {
    const queryId = req.query._id;    
    const result = await appointmentService.deleteOneList(queryId);    
    if (result) {
      res.status(200).send('success!');  
    }     
  } catch (e) {
    next(e)
  }
};
