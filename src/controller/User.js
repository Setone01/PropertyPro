import { v4 as uuidv4 } from "uuid";
import db from "../config/index.js";
import { compareSync, hashSync } from "bcrypt";
import { createUser, queryUserByEmail } from "../database/sql.js";
import { createToken } from "../middleware/auth.js";

const UserController = {
  async createAccount(req, res) {
    const { first_name, last_name, email, password, phone_no, is_admin } =
      req.body;

    const params = [
      uuidv4(),
      first_name,
      last_name,
      email,
      hashSync(password, 10),
      phone_no,
      is_admin,
    ];

    try {
      const { rows } = await db.query(createUser, params);
      if (rows) {
        // const { id, email: userEmail } = rows[0];
        const authUser = rows[0];
        const token = createToken(authUser);
        console.log("usertoken", token);
        return res.status(201).json({
          status: 201,
          data: { token },
          authUser,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  async login(req, res) {
    const { email } = req.body;
    const params = [email];

    try {
      const { rows } = await db.query(queryUserByEmail, params);
      if (rows) {
        if (rows[0]) {
          const comparePassword = compareSync(
            req.body.password,
            rows[0].password
          );
          if (comparePassword) {
            //removing password from the token
            // const { id, email: userEmail } = rows[0];
            const authUser = rows[0];

            const token = createToken(authUser);
            return res.status(201).json({
              status: 201,
              data: { token },
            });
          }
          if (!comparePassword) {
            return res.status(401).json({
              status: 401,
              error: "Authentication failed",
            });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },
};

export default UserController;
