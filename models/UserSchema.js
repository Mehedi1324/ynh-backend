import express from 'express';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  orders: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Users', UserSchema);
