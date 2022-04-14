const UserModel = require('../../models/users');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');

class UserService {
    async registration(name, password) {
        const candidate = await UserModel.findOne({name})
        if (candidate) {
            throw new Error(`Пользователь с данным логином: ${name} уже существует`)
        }             
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({name, password: hashPassword})  
        
        const tokens = tokenService.generateTokens({id : user._id, name: user.name});
        await tokenService.saveToken(user._id , tokens.refreshToken);
        return {
          ...tokens, 
          user: name,
          id : user._id
        }
    }
}

module.exports = new UserService();
