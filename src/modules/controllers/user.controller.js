const { status } = require('express/lib/response');
const User = require('../../models/users');

module.exports.singIn = (req, res) => {
  const body = req.body
  const user = {
    name: body.name,
    password: body.password
  }  
  User.findOne(user).then(result => {
    result ? res.status(200).send(result): res.status(404).send('Incorrect name or password');    
  });
};

module.exports.createUser = (req, res) => {  
  if (!req.body.name && !req.body.password ) {
    res.status(422).send('one of values is empty');    
  }
  const user = new User(req.body); 
  user.save().then(result => {  
    res.status(200).send(result);
  }).catch(err => res.status(404).send(err));
 };