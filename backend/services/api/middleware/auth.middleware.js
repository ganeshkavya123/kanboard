const jwt = require('jsonwebtoken');
const { API_RESPONSE_MESSAGES, API_RESPONSE_STATUS_CODE } = require('../../../common/constants');


module.exports = {
  authenticateToken: (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({
        status: API_RESPONSE_STATUS_CODE.FAILED,
        message: API_RESPONSE_MESSAGES.UNAUTHORIZED,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: API_RESPONSE_STATUS_CODE.FAILED,
          message: API_RESPONSE_MESSAGES.FORBIDDEN,
        });
      }

      req.user = user; 
      next();
    });
  },
};
