import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const Helper = {
  /**
   * Hash password method
   * @params {string} password
   * @return {string} returns hashed password
   */

  hashPassword(password) {
    return bcrypt.hash(password.getSaltSync(10));
  },

  /**
   * comparePassword
   * @params {string} hashPassword
   * @params {string} password
   * @returns {Boolean} return true or false
   */

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * Email helper method
   * @params {string} email
   * @returns {Boolean} true or false
   */

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
};

export default Helper;
