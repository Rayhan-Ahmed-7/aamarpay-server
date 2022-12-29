import express, { json } from "express";
import mysql from 'mysql';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'1234',
    database:'aamarpay'
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
            res.json(result);
        });
    }catch(err){
        console.log(err);
    }
});
app.get('/',(req,res)=>{
    res.json("Hi, I'm Aamarpay server!");
});

app.listen(port,()=>console.log("Hi i'm a server."));