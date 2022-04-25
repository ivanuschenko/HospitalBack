const jwt = require('jsonwebtoken');
const tokenModel = require('../../models/token');
const AppointModel = require('../../models/appointments');
const UserModel = require('../../models/users');
const ApiError = require('../../exceptions/api-error');

class AppointmentService {
   
  async showById(token) {
    if (!token) {
      throw ApiError.NotAllFields();
    }    
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);       
    const allListByID = AppointModel.find({userID : userData.id});    
    return(allListByID);
  }

  async createNewList(name, doctor, date, list, token) {    
    if (!name && !doctor && !date && !list) {
      throw ApiError.NotAllFields();
    }
  const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET); 
  const appoint = await AppointModel
  .create({
    patient: name,
    doctor: doctor,
    date : date,
    complaint: list,
    userID: userData.id
    });
  const result = AppointModel.find({userID : userData.id})  
  return(result);    
  }

  async updateOneList(id, body, token) {    
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const appoint = await AppointModel
    .updateOne({_id: id}, body);
    const result = AppointModel.find({userID : userData.id})    
    return result; 
  }
}
module.exports = new AppointmentService();