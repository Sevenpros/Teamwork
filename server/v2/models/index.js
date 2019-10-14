import { Pool } from 'pg';
import { config } from 'dotenv';

config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Database connected');
});

const query = (userquery) => pool.query(userquery)
  .then((res) => res.rows)
  .catch((error) => { throw new Error(error); });

export default query;
