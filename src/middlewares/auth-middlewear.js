const ApiError = require('../exceptions/api-error');
const tokenService = require('../modules/service/token-service');

module.exports =  (req, res, next) => {
  try {
    const authorisationHeader = req.headers.authorization;
    if (!authorisationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorisationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError()); 
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  }
  catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};