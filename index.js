const express=require('express')
const mongoose=require('mongoose')
const body=require('body-parser');
const { request } = require('http');
const app=express()
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://preranabangera06:Peru456@cluster0.c0dap3h.mongodb.net/tododb",{usenewurlParser:true})

const todoschema=new mongoose.Schema({task:String})

const todomodel=mongoose.model("task",todoschema)

// const t1=new todomodel({task:"gaming"})
// const t2=new todomodel({task:"studying"})
// const t3=new todomodel({task:"playing"})

// t2.save()
// t3.save()

//t1.save()



app.get("/",function(req,res){
    todomodel.find().then((result) => {
        res.render("index",{tasks:result})
    }).catch((err) => {
       console.log(err)
    });


   
})

app.post("/",function(req,res){
   var todotask=req.body.task
//    console.log(task)
//    lists.push(task)
   const task=new todomodel({task:todotask})
   task.save()

   res.redirect("/")
})


app.post("/delete",function(req,res){
    var item=req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result) => {
      res.redirect("/")
    }).catch((err) => {
      console.log(err)
    });
})

app.listen(3000,function(){
    console.log('Server is up and running')
})




//how to run 
//mongosh
//open mongodb ,connect
//node index.js
//run localhost:3000 in browser