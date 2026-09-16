const { Pool } = require('pg');
(async ()=>{
  const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'todos',
    port: 5432,
  });
  try{
    await pool.query('SELECT 1');
    console.log('DB reachable');
    process.exit(0);
  }catch(e){
    console.error('DB error', e.message);
    process.exit(2);
  }
})();
