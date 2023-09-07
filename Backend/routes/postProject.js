const express=require('express');
const postprojectRouter=express.Router();
const Project=require('../models/Project');

postprojectRouter.post('/',async (req,res)=>{
    const {projectname,duedate}=req.body;
    const newProject=new Project({
        projectname,duedate
    });
    await newProject.save()
    .then((project)=>{
        console.log('Project saved successfully',project);
        res.status(201).json({message:'Project saved successfully'});
    })
    .catch((error)=>{
        console.error('Error saving document:',error);
        res.status(500).json({error:'Internal Server Error'});
    })
})

module.exports=postprojectRouter;