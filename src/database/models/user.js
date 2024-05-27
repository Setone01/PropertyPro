import pool from "../../config/database.config.js";

const usersTable = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id UUID PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email VARCHAR(55) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_no VARCHAR(55) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`;

export async function createUserTable() {
  try {
    const create = await pool.query(usersTable);
    console.log(
      `usersTable: ${create[0].command}PED and ${create[1].command}D`
    );
  } catch (error) {
    console.log(`usersTable ${error}`);
  }
}
