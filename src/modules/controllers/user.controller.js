const { status } = require('express/lib/response');
const User = require('../../models/users');
const userService = require('../service/user-service');

module.exports.registration = async (req, res, next) => { 
  try {     
    const {name, password} = req.body;
    const userData = await userService.registration(name, password);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
    return res.json(userData); 
  } catch (e) {
      next(e)        
  }
}
 
module.exports.signIn = async (req, res, next) => {  
  try {
    const {name, password} = req.body;
    const userData = await userService.signIn(name, password);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    return res.json(userData);
  } catch (e) {
      next(e);
    }
}
module.exports.signOut = async (req, res, next) => {  
  try {
      const {refreshToken} = req.cookies;
      const token = await userService.signOut(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
  } catch (e) {
      next(e);
  }  
}

