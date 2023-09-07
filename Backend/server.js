const express=require('express');
const app=express();
const cors=require('cors');
const postprojectRouter=require('./routes/postproject');
const getProjectRouter=require('./routes/getprojects');
const editprojectRouter=require('./routes/editproject');
const deleteprojectRouter=require('./routes/deleteproject');
const filterprojects=require('./routes/filterprojects');
require('dotenv').config();
require('./dbconfig');

const PORT=process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/postProject',postprojectRouter);
app.use('/getProject',getProjectRouter);
app.use('/getprojectdata',editprojectRouter);
app.use('/editproject',editprojectRouter);
app.use('/deleteproject',deleteprojectRouter);
app.use('/getProject',filterprojects);


app.get('/',(req,res)=>{
    res.send('Server is running...');
})

app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
});