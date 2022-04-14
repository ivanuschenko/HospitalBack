const { status } = require('express/lib/response');
const User = require('../../models/users');
const userService = require('../service/user-service');

module.exports.registration = async (req, res) => { 
  try {
    if (!req.body.name && !req.body.password ) {
      throw new Error(res.status(422).send('one of values is empty'));     
    }  
    const {name, password} = req.body;
    const userData = await userService.registration(name, password);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
    return res.json(userData); 
  } catch (e) {
    res.status(401).send('Incorect login or password');    
  }
}
 
module.exports.signIn = (req, res) => {
  if (!req.body.name && !req.body.password ) {
    res.status(422).send('one of values is empty');    
  }  
  const user = {...req.body};
    
  User.findOne(user).then(result => {
    result ? res.status(200).send(result): res.status(404).send('Incorrect name or password');    
  });
};
 
