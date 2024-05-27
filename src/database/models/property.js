import pool from "../../config/database.config.js";

const propertyTable = `DROP TABLE IF EXISTS property CASCADE;
  CREATE TABLE property (
    id UUID PRIMARY KEY NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    price INTEGER NOT NULL,
    type VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    bedrooms INTEGER NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT NOW()
    )`;

export async function createPropertyTable() {
  try {
    const create = await pool.query(propertyTable);
    console.log(
      `propertyTable: ${create[0].command}PED and ${create[1].command}D`
    );
  } catch (error) {
    console.log(`propertyTable ${error}`);
  }
}
