import mysql from "mysql2/promise";

const createDb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        });
        await connection.query("CREATE DATABASE IF NOT EXISTS api_rest_db;");
        console.log("Base de datos 'api_rest_db' creada o ya existente.");
        await connection.end();
    } catch (error) {
        console.error("Error al crear la base de datos:", error);
        process.exit(1);
    }
};

createDb();
