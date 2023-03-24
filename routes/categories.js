const express= require("express");
const { isAuthenticated } = require("../auth");
const Categories= require("../models/categories");

const router= express.Router();

router.post("/addCategory",isAuthenticated, async(req,res)=>{
    // console.log(req.body, "Before Setting");
    try{
        
        let  category = await Categories.create({...req.body});
         console.log(req.body, category)
        res.json({category, message:"Category Added Succesfully"})
        
    }
    catch(e){
        console.log("err is here")
        res.json({error:e.message});
    }
});




router.put("/updateCategory/:id", async (req,res)=>{
    try{

        const category = await Categories.findOne({_id:req.params.id})
            
        const categoryUpdate = await Categories.updateOne({_id:req.params.id},{$set:{name:req.body}})
        res.json({

            message:"Category Updated",
            categoryUpdate
        })


    }catch(e){
        res.json(e.message)
    }
})


router.get("/getAllCategory",async(req,res)=>{
    // console.log("enterned backend")
    try{
        const data = await Categories.find();
        res.json(data)

    }catch(e){
        res.json({e});
    }
})


router.delete("/deleteCategory/:id", async(req,res)=>{
    try{
        
        let category = await Categories.findByIdAndDelete({_id:req.params.id})
        console.log(category);
        res.status(204).json( {message:"Deleated by ID"})
    }
    catch(error){
        res.status(404).json({error:"There is no Category  with that id"})
    }
})


module.exports = router;