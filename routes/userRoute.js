import express from 'express';
import Users from '../models/UserSchema.js';
import Manufacturer from '../models/ManufacturerSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Sign Up user and admin -----------------------------

router.post('/register', async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new Users({
    user: req.body.user,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    role: req.body.role,
  });
  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    next(err);
  }
});

// Sign Up for Seller -----------------------------

router.post('/register/seller', async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new Users({
    user: req.body.user,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    role: req.body.role,
  });
  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    next(err);
  }
});
// Sign Up for manufacturer ----------------------------

router.post('/register/manufacturer', async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new Manufacturer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    designation: req.body.designation,
    mobile_number: req.body.mobile_number,
    whats_app: req.body.whats_app,
    company_name: req.body.company_name,
    about_company: req.body.about_company,

    shareholder: req.body.shareholder,
    tin: req.body.tin,
    file: req.body.file,
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
      const isValidPassword = bcrypt.compare(
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
          message: 'Login Successful !',
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
