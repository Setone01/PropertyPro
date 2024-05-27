import pool from './database.config'


export default {
  /**
   * DB Abstraction
   * @param {string} text
   * @param {string} params
   *
   */

  async query(text, params) {
    try {
      const result = await pool.query(text, params);
      return result;
    } catch (error) {
      console.log("db", error);
    }
  },
};