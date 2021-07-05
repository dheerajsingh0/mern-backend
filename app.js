const dotenv=require("dotenv");// to keep secure our password we use dotenv
const Mongoose=require('mongoose');
const express=require('express');
const app=express();

//require dot env content
dotenv.config({path:'./config.env'})
//require database connection
require('./db/conn');
// require userschema
//const User=require('./userSchema/userSchema');


app.use(express.json());

// require router we have link router file
app.use(require('./router/auth'));

// initializting port
const PORT=process.env.PORT;



//middleware  its is used to check before starting other page (eg: show page if use logged in )
// const middleware = (req,res,next)=>{
//     console.log(`hello my middleware`);
//     next();

// } 


// app.get('/',(req,res)=>{
//     res.send(`hello world from server`);
    
// });
// app.get('/about',middleware,(req,res)=>{   // call the middleware
//     res.send(`hello about page`);
// });
app.get('/contact',(req,res)=>{
    res.cookie("dj","dheerajsingh");
    res.send(`hello contact page`);
});
app.get('/signup',(req,res)=>{
    res.send(`hello sign up page`);
});
app.get('/signin',(req,res)=>{
    res.send(`hello signin page`);
});




app.listen(PORT,()=>{
    console.log(`server is running ar port no ${PORT}`);
})