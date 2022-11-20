const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;

//body parser
app.use(bodyParser.json());
app.use(bodyPaarser.urlencoded({
    extended: false
}));

//create data
app.post('/api/admin',(req, res)=>{
    //menampung data
    const data = {...req.body};
    const  querySql = 'INSERT INTO admin SET ?';
    
    //running query
    koneksi.queri(querySql, data, (err, rows, field)=>{
        //nampung error
        if(err){
            return res.status(500).json({message: 'failed insert data!', error: err});
        }
        res.status(200).json({ success: true, message:'success insert data'});
    })
})

// read data
app.get('/api/admin',(req, res)=>{
    const  querySql = 'SELECT * FROM admin';
    
    //running query
    koneksi.queri(querySql, (err, rows, field)=>{
        //nampung error
        if(err){
            return res.status(500).json({message: 'Something when wrong', error: err});
        }
        res.status(200).json({ success: true, data:rows});
    })
})

//update data
app.put('/api/admin:id',(req, res)=>{
    const data = { ...req.body };
    const querySerch = 'SELECT * FROM admin WHERE id = ?';
    const queryUpdate = 'UPDATE admin SET ? WHERE id = ?';
    
    //running query
    koneksi.query(querySearch, req.parametrs.id, (err, rows, field) => {

        //log error
        if(err){
            return res.status(500).json({message: 'Something when wrong', error: err});
        }

        //jika ketemu id
        if(rows.lenghth){
            koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
                if(err){
                    return res.status(500).json({message: 'failed update', error: err});
                }
                res.status(200).json({ success: true, message:'success update data!'})
            });
        }
        else{
            return res.status(404).json({message:'Data Tidak Ditemukan', success: false});
        }
    });
});

//deleted data
app.delete('/api/admin:id',(req, res)=>{
    const data = { ...req.body };
    const querySerch = 'SELECT * FROM admin WHERE id = ?';
    const queryUpdate = 'DELETED admin SET ? WHERE id = ?';
    
    //running query
    koneksi.query(querySearch, req.parametrs.id, (err, rows, field) => {

        //log error
        if(err){
            return res.status(500).json({message: 'Something when wrong', error: err});
        }

        //jika ketemu id
        if(rows.lenghth){
            koneksi.query(queryDelete, [data, req.params.id], (err, rows, field) => {
                if(err){
                    return res.status(500).json({message: 'failed update', error: err});
                }
                res.status(200).json({ success: true, message:'success deleted data!'})
            });
        }
        else{
            return res.status(404).json({message:'Data Tidak Ditemukan', success: false});
        }
    });
});

//log Server
app.listen(PORT,()=>{
    console.log('server running at port: $(PORT}');
})