const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monash'
})

module.exports = db
// untuk pakai kat luar