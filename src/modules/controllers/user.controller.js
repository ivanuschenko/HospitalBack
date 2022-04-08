const User = require('../../models/users');

module.exports.createUser = (req, res, next) => {
  const user = new User(req.body);
  user.save().then(result => {  
    res.send(result);
  }).catch(err => console.log(err));
 };
