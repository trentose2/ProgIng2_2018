let express = require('express');
let router = express.Router();
let User = require("../model/user");
let users = new Array();

router.post("/", function(req, res) {
    let usrOnBody = req.body;
    
    if(usrOnBody === undefined){
        res.status(400).send();
        return;
    }
    if(usrOnBody.name === undefined 
        || usrOnBody.lastname === undefined
        || usrOnBody.username === undefined
        || usrOnBody.email === undefined
        || usrOnBody.password === undefined
        || usrOnBody.exams === undefined){
            res.status(400).send();
            return;
        }
    
     let id = new Date().getTime();
     //console.log(req.body);
     let user = new User(
         id,
         req.body.name,
         req.body.lastname,
         req.body.username,
         req.body.email,
         req.body.password,
         req.body.exams         
     );
     users.push(user);
     res.status(201).send(user);
     return;
})

router.get("/:id", function(req,res) {
    //console.log(req.params.id);
    let userId = req.params.id;
    if(userId == undefined){
        res.status(400).send();
        return;
    }
    let valueReturned = users.find((user) => {return user.id == userId});
    if(valueReturned == undefined) {
        res.status(404).send();
        return;
    }
    else{
        res.status(200).send(valueReturned);
        return;
    }
    
})

module.exports = router;