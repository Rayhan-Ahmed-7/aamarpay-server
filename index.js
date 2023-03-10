import express, { json } from "express";
import mysql from 'mysql';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"sql8.freesqldatabase.com",
    user:'sql8587177',
    password:'JjrvDjVCXy',
    database:'sql8587177'
});

db.connect((err)=>{
    if(err) throw err;
    console.log("db is connected");
});

app.post('/user',async (req,res)=>{
    try{
        const {name,email,phone,amount,inVoiceId} = req.body;
        console.log(req.body);
        const q = "INSERT INTO userinfo(`name`,`email`,`phone`,`amount`,`inVoiceId`) VALUES(?)";
        const values = [name,email,phone,amount,inVoiceId];
        db.query(q,[values],(err,result)=>{
            if(err) res.json(err);
            else res.json(result);
        });
    }catch(err){
        res.json(err);
    }
});
app.get('/user/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const q = "SELECT * FROM userinfo WHERE inVoiceId = ?";
        db.query(q,[id],(err,result)=>{
            if(err) res.json(err);
            else res.json(result);
        });
    }catch(err){
        res.json(err);
    }
});
app.get('/',(req,res)=>{
    res.json("Hi, I'm Aamarpay server!");
});

app.listen(port,()=>console.log("Hi i'm a server."));