import "dotenv/config";
import mysql from "mysql";

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
  throw new Error("Configuración de conexión a base de datos invalida. Por favor, revise las variables de entorno 'DB_'.");
}

const dbConfig: mysql.Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export = dbConfig;