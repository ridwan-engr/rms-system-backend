import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { env } from "../config/env.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwt.js";


export const register = asyncHandler(async (req, res) => {

  const {
    name,
    email,
    password,
    role = "operator"
  } = req.body;

  const existingUser =
    await User.findOne({
      email: email.toLowerCase()
    });

  if (existingUser) {
    throw new ApiError(
      409,
      "Email already exists"
    );
  }

  const passwordHash =
    await bcrypt.hash(
      password,
      12
    );

  const user =
    await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role
    });

  const token =
    generateToken({
      userId: user._id.toString(),
      role: user.role
    });

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

});

export const login = asyncHandler(async (req, res) => {

  const {
    email,
    password
  } = req.body;

  const user =
    await User.findOne({
      email: email.toLowerCase()
    }).select("+passwordHash");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.passwordHash
    );

  if (!isMatch) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const token =
    generateToken({
      userId: user._id.toString(),
      role: user.role
    });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

});

export const me = asyncHandler(async (req, res) => {

  res.status(200).json({
    success: true,
    user: req.user
  });

});