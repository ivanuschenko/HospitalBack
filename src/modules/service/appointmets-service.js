const jwt = require('jsonwebtoken');
const Appointment = require('../../models/appointments');
const ApiError = require('../../exceptions/api-error');

class AppointmentService {
   
  async showById(token) {
    if (!token) {
      throw ApiError.NotAllFields();
    }     
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);          
    const allListByID = Appointment.find({userID : userData.id});    
    return(allListByID);
  }

  async createNewList(name, doctor, date, list, token) {    
    if (!name && !doctor && !date && !list) {
      throw ApiError.NotAllFields();
    }
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET); 
    const appoint = await Appointment
    .create({
      patient: name,
      doctor: doctor,
      date : date,
      complaint: list,
      userID: userData.id
      });
    const result = Appointment.find({userID : userData.id})  
    return result;    
  }

  async updateOneList(id, body, token) {    
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const appoint = await Appointment
    .updateOne({_id: id}, body);
    const result = Appointment.find({userID : userData.id})    
    return result; 
  }
}

module.exports = new AppointmentService();