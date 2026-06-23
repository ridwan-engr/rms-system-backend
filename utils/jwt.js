import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function generateToken(payload) {

  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    throw new Error(
      "JWT payload must be a plain object."
    );
  }

  return jwt.sign(
    payload,
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn
    }
  );

}

export function verifyToken(token) {

  return jwt.verify(
    token,
    env.jwtSecret
  );

}