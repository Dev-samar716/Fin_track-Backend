import { Pool } from 'pg';
import { configDotenv } from 'dotenv';

configDotenv();

const pool = new Pool({
    connectionString: process.env.DB_URL
})

export default pool;