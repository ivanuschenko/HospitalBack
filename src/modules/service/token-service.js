const jwt = require('jsonwebtoken');
const tokenModel = require('../../models/token');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
    return {
      accessToken,
      refreshToken
    }
  }  
           
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({user: userId, refreshToken});
    return token;
  }

  async removeToken(refreshToken) {    
    const tokenData = await tokenModel.deleteOne({refreshToken});
    return tokenData;
  }

  async findToken (refreshToken) {       
    const userData = await tokenModel.findOne({refreshToken});      
    return userData;    
  }

  validateAccessToken (token) {
    try {
      const userData = User.model.verify(token, process.env.JWT_ACCESS_SECRET);      
      return userData;
    } catch(e) {
      return null;
    }
  }

  validateRefreshToken (token) {
    try {
      const userData = User.model.jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch(e) {
      return null;
    }
  } 
}

module.exports = new TokenService();