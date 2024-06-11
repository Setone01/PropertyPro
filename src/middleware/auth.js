import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import db from "../config/database.config.js";
// import { queryUserById } from "../database/sql.js";

dotenv.config();

export const createToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { payload },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

//verifying token

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  console.log(token, "token");
  if (!token) {
    return res.status(401).json({
      status: 403,
      error: "No token provided",
    });
  }

  try {
    const authData = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      });
    });

    req.authData = authData;
    console.log("payload", req.authData);
    next();
  } catch (error) {
    if (error.message.includes("signature")) {
      return res.status(403).json({
        status: 403,
        error: "Invalid token",
      });
    }
    return res.status(403).json({
      status: 403,
      message: error.message,
    });
  }
};
