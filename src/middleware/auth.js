import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import db from "../config/database.config.js";
// import { queryUserById } from "../database/sql.js";

dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRET_KEY);
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
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
    next();
  });
};

// const Auth = {
//   /**
//    * Verify Token
//    * @param {object} req
//    * @param {object} res
//    * @param {object} next
//    * @returns {object|void} response object
//    */

//   async verifyToken(req, res, next) {
//     const token = req.headers["x-access-token"];
//     if (!token) {
//       return res.status(401).json({
//         status: 401,
//         error: "No token provided",
//       });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);
//       const { rows } = await db.query(queryUserById, [decoded.userId]);
//       if (!rows[0]) {
//         return res.status(401).json({
//           status: 401,
//           error: "Invalid token",
//         });
//       }
//       req.user_id = decoded.userId;
//       next();
//     } catch (error) {
//       return res.status(401).json({
//         status: 401,
//         error: "Token not provided",
//       });
//     }
//   },
// };
