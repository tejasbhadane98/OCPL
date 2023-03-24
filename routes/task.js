const express= require("express");
const { isAuthenticated } = require("../auth");
const Task= require("../models/task");

const router= express.Router();

router.post("/addtask",isAuthenticated, async(req,res)=>{
    // console.log(req.body, "Before Setting");
    try{
        
        let TaskID
        for(let i=0;;i++){
            TaskID="Task"+ Math.floor(1000 + Math.random() * 9000)
            let task = await Task.findOne({TaskID})
            if(task){
                continue
            }
            else break
        }
        let  task = await Task.create({...req.body.data,TaskID});
         console.log(req.body, task,  "After Setting")
        res.json({task, message:"Task Added Succesfully"})
        
    }
    catch(e){
        console.log("err is here")
        res.json({error:e.message});
    }
});




router.put("/updateTask/:TaskID", async (req,res)=>{
    try{

        const task = await Task.findOne({TaskID:req.params.TaskID})
            if(task.status==="Not Complete"){   
                return res.json({message:"Task Is Incompleted"})
            }
         
        const UpdatedTask = await Task.updateOne({TaskID:req.params.TaskID},{$set:{status:"Complete"}})
        res.json({

            message:"Task Completed",
            UpdatedTask
        })


    }catch(e){
        res.json(e.message)
    }
})


router.get("/getAllTask",async(req,res)=>{
    // console.log("enterned backend")
    try{
        const data = await Task.find();
        res.json(data)

    }catch(e){
        res.json({e});
    }
})


router.get("/search/:search",async(req,res)=>{ 
    let pattern= new RegExp("^"+req.params.search)    
    let task = await Task.find({TaskID:{$regex:pattern}}, {category:{$regex:pattern}},{status:{$regex:pattern}}, {priority:{$regex:pattern}})
    console.log(task,"search results")
    res.json(property)
})

router.delete("/deleteTask/:TaskID", async(req,res)=>{
    try{
        
        let task = await Task.findByIdAndDelete({TaskID:req.params.TaskID})
        console.log(task);
        res.status(204).json( {message:"Deleated by ID"})
    }
    catch(error){
        res.status(404).json({error:"There is no Task  with that id"})
    }
})


module.exports = router;