const mongoose=require("mongoose");

const categorySchema= new mongoose.Schema({
    category_ID:String,
    name:String,
    color:String,
    
})

const Categories=mongoose.model("category",categorySchema)
module.exports=Categories;