import mysql from "mysql2";

const db = mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"",
   database:"it_monitoring_v2"
});

export default db;