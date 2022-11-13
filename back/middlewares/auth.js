// JWT FOR MORE SECURITY // USE A TOKEN TO CONNECT //
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // Finding the token part of the authorization headers //
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') // Ckecking if it matchs the secret token key //
    const userId = decodedToken.userId
    console.log('id from Auth')
    console.log(userId)
    req.auth = { userId}
    next()
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};