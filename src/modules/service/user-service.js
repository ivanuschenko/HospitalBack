const UserModel = require('../../models/users');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const ApiError = require('../../exceptions/api-error');

class UserService {
    async registration(name, password) {
        const candidate = await UserModel.findOne({name})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с данным логином: ${name} уже существует`)
        }
        if (!name || !password ) {
          throw ApiError.BadRequest('');     
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
    async signIn(name, password) {
      const user = await UserModel.findOne({name})
      if (!user) {
          throw ApiError.BadRequest(`Пользователь с таким именем ${name} не найден`)
      }
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
          throw ApiError.BadRequest('Неверный пароль');
      }      
      const tokens = tokenService.generateTokens({id : user._id, name: user.name});      
      await tokenService.saveToken(user._id , tokens.refreshToken);
      return {
        ...tokens, 
        user: name,
        id : user._id
      }
  }
    async signOut(refreshToken) {
      const token = await tokenService.removeToken(refreshToken);
      return token;
  }
}


module.exports = new UserService();
