const { status } = require('express/lib/response');
const User = require('../../models/users');

module.exports.createUser = (req, res) => {
  const user = new User(req.body);
  if (!user.name || !user.password ) {
    res.status(404).send('one of values is empty');    
  }

  user.save().then(result => {  
    res.status(200).send(result);
  }).catch(err => res.status(404).send(err));
 };

module.exports.singIn = (req, res) => {
  const body = req.body
  const user = {
    name: body.name,
    password: body.password
  }

  User.findOne(user).then(result => {
    result ? res.send(result): res.send(false);    
  });
};
