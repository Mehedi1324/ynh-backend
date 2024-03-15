import jwt from 'jsonwebtoken';

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const { email, userId } = decoded;
    req.email = email;
    req.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
};
