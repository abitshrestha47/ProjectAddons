const express=require('express');
const deleteprojectRouter=express.Router();
const Project=require('../models/Project');
const mongoose=require('mongoose');

deleteprojectRouter.delete('/:id',async(req,res)=>{
    var ObjectID;
    const id=req.params.id;
    ObjectID= new mongoose.Types.ObjectId(id);
    const query={_id:ObjectID};
    try{
        const result=await Project.deleteOne(query);
        console.log(`Deleted ${result}`);
        res.status(204).json({message:'deleted successfully'});
    }
    catch(err){
        console.log('Error deleting project',err);
    }
})

module.exports=deleteprojectRouter;