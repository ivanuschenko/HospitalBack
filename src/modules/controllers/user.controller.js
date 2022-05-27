const { status } = require('express/lib/response');
const User = require('../../models/users');
const userService = require('../service/user-service');
const lifeTime = {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}

module.exports.registration = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const userData = await userService.registration(name, password);
    res.cookie('accessToken', userData.accessToken, lifeTime);      
    res.cookie("refreshToken", userData.refreshToken, {lifeTime});
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};
 
module.exports.signIn = async (req, res, next) => { 
  const { name, password } = req.body;    
  try {    
    const userData = await userService.signIn(name, password);      
    res.cookie('accessToken', userData.accessToken, lifeTime);          
    res.cookie('refreshToken', userData.refreshToken, lifeTime);
    return res.json(userData);    
  } catch (e) {
    next(e);      
  }
};

module.exports.signOut = async (req, res, next) => {  
  try {    
    const {refreshToken} = req.cookies;         
    const token = await userService.signOut(refreshToken);
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken');
    return res.json(token);
  } catch (e) {
    next(e);
  }  
};

module.exports.refresh = async(req, res, next) => {
  try {
    const { refreshToken } = req.cookies;    
    const userData = await userService.refresh(refreshToken);
    res.clearCookie('accessToken');
    res.cookie('accessToken', userData.accessToken, lifeTime); 
    res.cookie('refreshToken', userData.refreshToken, lifeTime);    
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

