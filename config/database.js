const mysql = require('mysql');

//konfigurasi mysql
const koneksi =
mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'groubprojectbe13',
    multipleStatements:true
});

//log error koneksi
koneksi.connect((err)=>{
    if(err) throw err;
    console.log('MySQL Connected...');
})

module.exports = koneksi;