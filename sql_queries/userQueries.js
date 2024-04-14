// Description: SQL queries for user table.
const table = "users";

const insertUser = (email, password, fullname) => {
  // password will be crypt
  return {
    text: `INSERT INTO ${table} (email, password, fullname) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING *`,
    values: [email, password, fullname],
  };
};

const selectUser = (id) => {
  return {
    text: `SELECT * FROM ${table} WHERE id = $1`,
    values: [id],
  };
};

const updateUserFullname = (id, newFullname) => {
  return {
    text: `UPDATE ${table} SET fullname = $2 WHERE id = $1 RETURNING *`,
    values: [id, newFullname],
  };
};

const deleteUser = (id) => {
  return {
    text: `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
    values: [id],
  };
};

const getAllUsers = () => {
  return {
    text: `SELECT * FROM ${table} ORDER BY id ASC`,
  };
};

export { insertUser, selectUser, updateUserFullname, deleteUser, getAllUsers };
