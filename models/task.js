const mongoose=require("mongoose");

const taskSchema= new mongoose.Schema({
    TaskID:{type:String, unique:true},
    title:String,
    description:String,
    category:String,
    due_date:String,
    priority:String,
    status:String,
    user:String
})

const Tasks=mongoose.model("task",taskSchema)
module.exports=Tasks;