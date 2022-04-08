const User = require('../../models/users');

module.exports.createUser = (req, res, next) => {
  const user = new User(req.body);
  user.save().then(result => {  
    res.send(result);
  }).catch(err => console.log(err));
 };

module.exports.singIn = (req, res, next) => {
  const body = req.body
  const user = {
    name: body.name,
    password: body.password
  }  
  User.findOne(user).then(result => {
    result ? res.send(result): res.send(false);    
  });
};