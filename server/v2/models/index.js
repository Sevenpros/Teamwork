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


const connectDb = (query) => pool.query(query)
  .then((res) => res.rows)
  .catch((err) => err);

export default connectDb;
