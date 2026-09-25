import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load .env if present
dotenv.config();

const dbHost = process.env.DB_HOST || process.env.MYSQL_HOST || 'localhost';
const dbUser = process.env.DB_USER || process.env.MYSQL_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
const dbName = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'ac_repair_db';
const dbPort = parseInt(process.env.DB_PORT || process.env.MYSQL_PORT || '3306', 10);

async function run() {
  console.log(`Connecting to MySQL host: ${dbHost}:${dbPort} as user: ${dbUser}...`);

  let connection;
  try {
    // 1. Connect without DB first to ensure DB exists
    connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword
    });

    console.log(`Ensuring database '${dbName}' exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.changeUser({ database: dbName });

    // 2. Read and execute schema.sql
    const schemaPath = path.join(process.cwd(), 'src', 'lib', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('Running schema.sql migration...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      const statements = schemaSql
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const sql of statements) {
        await connection.query(sql);
      }
      console.log('Schema tables created successfully.');
    }

    // 3. Seed default admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@applianceseva.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'Admin@2026';
    const hash = await bcrypt.hash(adminPass, 10);

    await connection.query(
      `INSERT INTO users (id, email, password_hash, name, role)
       VALUES (1, ?, ?, 'Super Admin', 'admin')
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);`,
      [adminEmail, hash]
    );
    console.log(`Default admin configured: ${adminEmail}`);

    console.log('\nHostinger MySQL Database initialization completed successfully!');
  } catch (err) {
    console.error('Database migration error:', err);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

run();
