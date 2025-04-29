const express = require("express");
const router = express.Router();

const User = require("../models/UserModel")



router.get("/", async(req,res,next) =>{

    let users;

    try{

        users = await User.find();

    }catch(err){

        console.log(err);
    }if(!users){

        return res.status(404).json({message:"User not Found"});
    }

    return res.status(200).json({users});
});

router.post("/", async (req, res, next) => {
    const { employeeId, name, password, email, gender, numberOfSessions, amountPerSession } = req.body;

    let user; // Changed from "users" to "user" for consistency

    try {
        user = new User({ employeeId, name, password, email, gender, numberOfSessions, amountPerSession });
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add user" });
    }

    return res.status(200).json({ user });
});

router.get("/:id",  async(req,res,next) =>{

    const id = req.params.id;
    let user;
    
    try{

        user = await User.findById(id);

    }catch(err){

        console.log(err);
    }if(!user){

        return res.status(404).json({message:"User not Found"});
    }

    return res.status(200).json({user});
});

router.put("/:id",  async(req,res,next) =>{
    const id = req.params.id;
    const { employeeId, name, password, email, gender, numberOfSessions, amountPerSession } = req.body;
    let users;

    try{

        users = await User.findByIdAndUpdate(id,
            { employeeId:employeeId, name:name, password:password, email:email, gender:gender, numberOfSessions:numberOfSessions, amountPerSession:amountPerSession });

            users = await users.save();
    }catch(err){

        console.log(err);
    }if(!users){

        return res.status(404).json({message:"User not Found"});
    }

    return res.status(200).json({users});
});

router.delete("/:id",async(req,res,next) =>{

    const id = req.params.id;
    let user;

    try{

        user = await User.findByIdAndDelete(id );
          

           
    }catch(err){

        console.log(err);
    }if(!user){

        return res.status(404).json({message:"User not Found"});
    }

    return res.status(200).json({user});
})

module.exports = router;