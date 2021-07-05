const Mongoose=require('mongoose');

const DB=process.env.DATABASE;

Mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log(`connection suceessfull`);

}).catch((err)=>console.log(`no connection`));