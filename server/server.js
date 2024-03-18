const express=require('express')
const app=express();
const router=require('./router/auth-router')
const PORT=5000;

app.use("/api/auth",router);
app.listen(PORT,()=>{
    console.log(`server is up and runinng at port:${PORT}`)
})