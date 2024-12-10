const pool = require("./pool");

async function addUser(fullName, username, password, membership) {
  const addUserQuery = `
    insert into club_user (fullName, username, password, membership) 
    values ($1, $2, $3, $4);
    `;

  try {
    await pool.query(addUserQuery, [fullName, username, password, membership]);
  } catch (error) {
    console.error("Failed to add user", error);
  }
}

async function getUserByUsername(username) {
  const getUserQuery = `
    select username from club_user where username = $1;
    `;

  const { rows } = await pool.query(getUserQuery, [username]);

  return rows.length === 0 ? undefined : rows[0];
}

module.exports = { addUser, getUserByUsername };
