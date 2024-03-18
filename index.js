import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './connection/connection.js';
import productRoute from './routes/products.js';
import userRoute from './routes/userRoute.js';
import fileUpload from 'express-fileupload';

const app = express();

const port = process.env.PORT || 1010;
dotenv.config();

// Connecting mongodb through mongoose------

connectDB();

// Middleware------------------------

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());
app.use('/products', productRoute);
app.use('/user', userRoute);

// Error Handling--------------------------

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Database config-------------------------

app.listen(port, () => {
  console.log(('lissening to the port', port));
});
