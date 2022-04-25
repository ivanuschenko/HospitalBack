const UserModel = require('../../models/users');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const ApiError = require('../../exceptions/api-error');
const { refresh } = require('../controllers/user.controller');

class UserService {
  async registration(name, password) {
    const candidate = await UserModel.findOne({name})
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с данным логином: ${name} уже существует`)
    }
    if (!name || !password ) {
      throw ApiError.BadRequest('Одно из значений не задано');     
    };                  
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({name, password: hashPassword})         
    const tokens = tokenService.generateTokens({id : user._id, name: user.name});
    await tokenService.saveToken(user._id , tokens.accessToken);
    return {
      ...tokens           
    }
  }
  
  async signIn(name, password) {
    const user = await UserModel.findOne({name});
    if (!user) {
        throw ApiError.BadRequest(`Пользователь с таким именем ${name} не найден`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw ApiError.BadRequest('Неверный пароль');
    }      
    const tokens = tokenService.generateTokens({id : user._id, name: user.name});      
    await tokenService.saveToken(user._id , tokens.refreshToken);      
    return {
      ...tokens        
  }
} 

  async signOut(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);      
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const tokens = tokenService.generateTokens({id : user._id, name: user.name});      
    await tokenService.saveToken(user._id , tokens.refreshToken);
    return {
      ...tokens        
    }   
  } 
}
module.exports = new UserService();
