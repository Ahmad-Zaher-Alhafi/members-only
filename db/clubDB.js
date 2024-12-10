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

module.exports = { addUser };
