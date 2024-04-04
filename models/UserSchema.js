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

  role: {
    type: String,
    enum: ['user', 'admin', 'employee', 'seller', 'delivery_man'],
    default: 'user',
  },

  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Orders',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  wishList: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Wishlist',
    },
  ],
});

export default mongoose.model('Users', UserSchema);
