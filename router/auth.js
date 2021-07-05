const express=require('express');
const router =express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require("../db/conn");
const User=require("../model/userSchema");
const authenticate =require("../middleware/authenticate");

router.get('/',(req,res)=>{
    res.send(`hello world from router server`);
    
});
// using promisses
// router.post('/register',(req,res)=>{
//    // res.json({message:req.body}); console.log(req.body);
//    const{name,email,phone,work,password,cpassword}=req.body;
//    if(!name || !email || !phone || !work || !password  || !cpassword)
//    {
//        return res.status(422).json({error:"Plz fille the fieled peoperly"});
//    }

//    User.findOne({email:email})
//    .then((userExit)=>{
//        if(userExit){
//         return res.status(422).json({error:"Email already exists"});
//        }
//        const user=new User({name,email,phone,work,password,cpassword});
//        user.save().then(()=>{
//         return res.status(201).json({error:"User register sucessfull"});
//        }).catch((err) => {console.log(err)});
//    }).catch(err =>{console.log(err);}) ;
// });

router.post('/register',async(req,res)=>{
    const{name,email,phone,work,password,cpassword}=req.body;
    if(!name || !email || !phone || !work || !password  || !cpassword)
    {
        return res.status(422).json({error:"Plz fill the Input Fields peoperly"});
    }
    try{
       const userExit=await User.findOne({email:email})
       if(userExit){
        return res.status(422).json({error:"Email already exists"});
       }

       else if(password !=cpassword){
        return res.status(422).json({error:"password are not matching"});
       }
       else{
        const user=new User({name,email,phone,work,password,cpassword});
        // yaha pe hasing byt bcrypyjs
        await user.save();
        res.status(201).json({error:"User register sucessfull"});
 

       }
      
    }
    catch(err){
        console.log(err);

    }
});

//login route
router.post("/signin",async(req,res)=>{
    // console.log(req.body);
    // res.json({message:"awesome"});
    try{
        let token;
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"Plz filed the data"});
        }
        const userLogin=await User.findOne({email:email});
        console.log(userLogin);
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
            const token=await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true

            });
            if(!isMatch)
            {
                res.status(400).json({error:"Invalid credientials password"});
            }
            else
            {
                res.status(201).json({error:"User SignIn Sucessfully"});
            }

        }
        else{
            res.status(400).json({error:"Invalid credientials Email"});

        }
    }
catch(err){
    console.log(err);

}
});

router.get('/about',authenticate,(req,res)=>
{   // call the middleware
    console.log(`hello about page`);
    res.send(req.rootUser);

});

module.exports=router;
