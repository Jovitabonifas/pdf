const express= require("express")
const app = express();


app.get("/", function(req,res){
    res.sendFile(__dirname + "/output1.pdf")
})


    app.listen(7000,function(req,res){
        console.log("server is running,welcome ")
    })