import mysql from 'mysql2';
const dbConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'sannagar',
    database : 'hotel'
});
export const db={
  dbConnection
}
