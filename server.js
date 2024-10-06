const express=require("express")
const app=express()
const path=require("path")
const cors=require("cors")
app.get("/",(req,res)=>{
    res.setHeader("Content-Type", "application/json");
    res.sendFile(path.join(__dirname,"./index.json"))
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
})
app.listen(2000)