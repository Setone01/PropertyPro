export const queryUser = `SELECT * FROM users`;
export const createUser = `INSERT INTO users (id, first_name, last_name, email, password, phone_no, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
export const queryProperty = `INSERT INTO property (id, user_id, title, status, type, price, city, state, bedrooms, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`;
export const queryUserByEmail = `SELECT * FROM users WHERE email = $1`;
export const queryUserById = `SELECT * FROM users WHERE id = $1`;
export const updateProperty = `
  UPDATE property
  SET
    title = $1,
    status = $2,
    price = $3,
    type = $4,
    state = $5,
    city = $6,
    bedrooms = $7,
    description = $8,
    image_url = $9,
    created_date = $10,
    modified_date = $11
  WHERE
    id = $12 AND user_id = $13
  RETURNING *
`;
export const findOneQuery = `SELECT * FROM property WHERE id=$1 AND user_id=$2`;
export const updateStatus = `UPDATE property SET status = $1 WHERE id=$2 user_id=$3`;
export const deletePropQuery = `DELETE FROM property WHERE id=$1`;
export const queryAllProperty = `SELECT * FROM property`;
export const queryPropertyByType = `SELECT * FROM properties WHERE type = $1`;
export const queryAdvert = `SELECT * FROM property WHERE = $1`;
