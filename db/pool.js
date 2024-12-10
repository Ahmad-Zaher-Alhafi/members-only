const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://zaherha:a123a123@localhost:5432/privateclub",
});

module.exports = pool;
