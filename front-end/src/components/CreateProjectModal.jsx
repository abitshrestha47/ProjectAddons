import '../styles/Modals.css'
//used for props validation without it error might occur 
import axios from 'axios';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {toast} from 'react-toastify';
import {connect} from 'react-redux';
import { addProject } from '../redux/projectActions';
import { useDispatch } from 'react-redux';



const CreateProjectModal=({isOpen,closeModal})=>{
    const dispatch = useDispatch();
    
    const [projectname,setProjectName]=useState('');
    const [duedate,setDueData]=useState('');
    const handleClose=()=>{
        closeModal();
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(`http://localhost:4747/postProject`,{
                projectname,duedate
            });
            if(response.status===201){
                toast.success('Project added successfully');
                dispatch(addProject({ projectname, duedate }));
                setProjectName('');
                setDueData('');
                closeModal();
            }

        }catch(e){
            console.log(`${e}`);
        }
    }
    return(
        <div className={`modal ${isOpen?"open":""}`}>
            <button className='close-btn' onClick={handleClose}>&times;</button>
            <h1>Enter your details</h1>
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="projectName">Project Name</label>
                    <input type='text' value={projectname} placeholder='Enter your project...' name='projectname' onChange={(e)=>setProjectName(e.target.value)}/><br/><br/>
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="datetime-local" value={duedate} placeholder='Due date...' name='duedate' onChange={(e)=>setDueData(e.target.value)}/><br/>
                    <button type='submit' className='modalBtn'>Add</button>
                </form>
            </div>
        </div>
    );
}

//props validation
CreateProjectModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal:PropTypes.func.isRequired,
};



const CreateProject=connect(null,{addProject})(CreateProjectModal);
export default CreateProject;