import express from 'express';
import Users from '../models/UserSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotev from 'dotenv';
const router = express.Router();

// Sign Up -----------------------------

router.post('/register', async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new Users({
    user: req.body.user,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
  });
  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    next(err);
  }
});

// Sign In-----------------------------------------

router.post('/login', async (req, res, next) => {
  const users = await Users.find({ email: req.body.email });

  try {
    if (users && users.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        users[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            email: users[0].email,
            userId: users[0]._id,
          },
          process.env.JWT_TOKEN,
          { expiresIn: '1h' }
        );
        res.status(200).json({
          accesstoken: token,
          y,
        });
      } else {
        res.status(401).json({
          error: 'Authentication Failed',
        });
      }
    } else {
      res.status(401).json({
        error: 'Authentication Failed',
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
