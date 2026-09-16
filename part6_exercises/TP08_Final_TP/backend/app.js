const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const clientProm = require('prom-client');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'todos',
  port: 5432,
});

// Initialize DB with retries
async function initDB() {
  const maxRetries = 10;
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, text TEXT NOT NULL);`);
      console.log('Database initialized');
      return;
    } catch (err) {
      attempt++;
      console.error(`DB init attempt ${attempt}/${maxRetries} failed:`, err.message);
      if (attempt < maxRetries) await new Promise(r=>setTimeout(r, 2000));
    }
  }
  throw new Error('Failed to initialize database');
}

const collectDefaultMetrics = clientProm.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/', (req, res) => res.json({message:'TP08 Backend API', version:'1.0.0'}));

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', clientProm.register.contentType);
  res.end(await clientProm.register.metrics());
});

app.get('/todos', async (req, res) => {
  try{
    const r = await pool.query('SELECT id, text FROM todos ORDER BY id');
    res.json(r.rows);
  } catch(err){
    res.status(500).json({error: err.message});
  }
});

app.post('/todos', async (req, res) => {
  const text = req.body.text;
  if(!text) return res.status(400).json({error:'text required'});
  try{
    const r = await pool.query('INSERT INTO todos (text) VALUES ($1) RETURNING id, text', [text]);
    res.status(201).json(r.rows[0]);
  } catch(err){
    res.status(500).json({error: err.message});
  }
});

const port = process.env.PORT || 3000;
initDB().then(()=>{
  app.listen(port, ()=> console.log('Backend listening on', port));
}).catch(err=>{
  console.error('Fatal: DB init failed', err);
  process.exit(1);
});
