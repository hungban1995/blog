import mysql from 'mysql'
export const db = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12621773',
    password: 'W1cLNngQj7',
    database: 'sql12621773'
})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

