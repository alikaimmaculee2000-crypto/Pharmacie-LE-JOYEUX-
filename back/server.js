import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
const port=Number(process.env.PORT||4000);
app.use(cors({origin:process.env.FRONTEND_ORIGIN||'http://localhost:5173'}));
app.use(express.json({limit:'20kb'}));
app.get('/api/health',(_req,res)=>res.json({ok:true,service:'Pharmacie Le Joyeux API',version:'1.0.0'}));
app.post('/api/contact',(req,res)=>{
 const {name,phone='',subject,message}=req.body??{};
 if(typeof name!=='string'||!name.trim()||typeof subject!=='string'||!subject.trim()||typeof message!=='string'||!message.trim())return res.status(400).json({ok:false,message:'Veuillez remplir le nom, l’objet et le message.'});
 if(name.length>120||typeof phone!=='string'||phone.length>40||subject.length>160||message.length>4000)return res.status(400).json({ok:false,message:'Certains champs sont trop longs ou invalides.'});
 return res.status(202).json({ok:true,message:'Demande validée. Utilisez WhatsApp pour confirmer l’envoi.',contact:'+243975115817',receivedAt:new Date().toISOString()});
});
app.listen(port,()=>console.log('Pharmacie Le Joyeux API démarrée sur le port '+port));
