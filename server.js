require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));



mongoose.connect("mongodb+srv://whatsAppdb:"+process.env.KEY+"@cluster0.ckaod.mongodb.net/webPortfolio?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});


const skillSchema={
    id:Number,
    name:String,
    level:String
};

const Skill = mongoose.model("Skill",skillSchema);

const iconSchema = {
    id:Number,
    heading:String,
    icon:String,
    para:String
};

const Icon = mongoose.model("Icon", iconSchema);

const contactSchema = {
    name:String,
    email:String,
    text:String
};

const Contact = mongoose.model("Contact",contactSchema);

const projectsSchema = {
    id:Number,
    img:String,
    name:Number,
    link:String,
    alt:String,
    para:String,
    tech:Object
};

const Project = mongoose.model("Project", projectsSchema);


const internshipsSchema = {
     id:Number,
     heading:String,
     para:String,
     link:String
};

const Internship = mongoose.model("Internship",internshipsSchema);

app.get("/",function(req,res){
  res.send("Hey backend");
});

app.get("/skills",function(req,res){
    Skill.find(function(err,foundSkills){
      if(!err){
        res.send(foundSkills);
        console.log(foundSkills);
      }else{
        res.send(err);
      }
    });
  });

app.get("/icons",function(req,res){
    Icon.find(function(err,foundIcon){
        if(!err){
            res.send(foundIcon);
        }else{
            res.send(err);
        }
    });
});

app.post("/contacts",function(req,res){
    const newContact = new Contact({
        name : req.body.nameSet,
        email : req.body.emailSet,
        text : req.body.textSet
    });

    newContact.save(function(err){
        if(!err){
            res.send("Thanx for your interest.");
        }else{
            res.send("Sorry please try again.");
        }
    });
});

app.get("/projects", function(req,res){
    Project.find(function(err,foundProject){
        if(!err){
            res.send(foundProject);
        }else{
            res.send(err);
        }
    });
});


app.get("/internships",function(req,res){
    Internship.find(function(err,findInternship){
        if(!err){
            res.send(findInternship);
        }else{
            res.send(err);
        }
    });
});
var port = process.env.PORT || 9000;
app.listen(port,function(){
    console.log("Server started at port:"+port);
});
