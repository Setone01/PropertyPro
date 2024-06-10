import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import db from "../config/database.config.js";
// import { queryUserById } from "../database/sql.js";

dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "2d",
  });
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  console.log(token, "token");
  if (!token) {
    return res.status(401).json({
      status: 403,
      error: "No token provided",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, authData) => {
    if (error) {
      if (error.message.includes("signature")) {
        return res.status(403).json({
          status: 403,
          error: "Invalid token",
        });
      }
      return res.status(403).json({
        status: 403,
        message: error,
      });
    }
    req.authData = authData;
    console.log("payload", req.authData);
    next();
  });
};
