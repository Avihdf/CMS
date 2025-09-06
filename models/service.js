const mongoose=require('mongoose')
const service=new mongoose.Schema({

     service_name:String,
     details:String,
     price:Number
});

module.exports=mongoose.model("Services",service);