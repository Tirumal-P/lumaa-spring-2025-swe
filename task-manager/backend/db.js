const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Set up PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Tiru@2002',
  port: 5432,  // Default PostgreSQL port
});

// Read init.sql File
const initSQL = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf-8');


// Run SQL File
pool.query(initSQL)
  .then(() => console.log('Database initialized successfully'))
  .catch(err => console.error('Database initialization failed:', err));
  
module.exports = pool;
