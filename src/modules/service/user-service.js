const UserModel = require('../../models/users');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
    async registration(name, password) {
        const candidate = await UserModel.findOne({name})
        if (candidate) {
            throw new Error(`Пользователь с данным логином: ${name} уже существует`)
        }             
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({name, password: hashPassword})  
        const userDto = new UserDto(user); // id, name
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
          ...tokens, 
          user: userDto
        }
    }
}

module.exports = new UserService();
