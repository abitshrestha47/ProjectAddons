import { useEffect, useState } from "react";
import "../styles/Body.css";
import axios from "axios";
import ProjectBoxes from "./ProjectBoxes";
import Edit from "./Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import {toast} from 'react-toastify';
import { addProject } from "../redux/projectActions";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const Body = ({projects}) => {
  console.log(projects);
  const [editPopup,seteditPopup]=useState({ isOpen: false, projectId: null });
  const [data, setData] = useState([]);
  // const [status,setStatus] = useState(0);
  const openPopup=(projectId)=>{
    seteditPopup({isOpen:true,projectId:projectId});
    console.log(projectId);
    console.log(editPopup);
  }
  const updateData = async(updatedProjectData) => {
    const updatedIndex = data.findIndex((item) => item._id === updatedProjectData._id);
  
    if (updatedIndex !== -1) {
      const newData = [...data];
      newData[updatedIndex] = updatedProjectData;
      setData(newData);
    }
    getContents();
  };
  
  const deleteProject=async (itemId)=>{
    try{
      const response=await axios.delete(`http://localhost:4747/deleteproject/${itemId}`);
      console.log(response);
      if(response.status===204){
        toast.success('Project deleted successfully');
        getContents();
      }
    }catch(error){
      console.log(`Error:${error.message}`);
    }
  }
  const closeModal=()=>{
    seteditPopup({isOpen:false,projectId:null});
  }
  const handleStatusChange = async (event, item_id) => {
    // setStatus(parseInt(event.target.value,10));
    //10 to represent a decimal number
    // const selectedValue=(status)=>{
    //   switch(status){
    //     case 0:return "Not started";
    //     case 1:return "Running";
    //     case 2:return "Completed";
    //     default:return "";
    //   }
    // }
    const newStatus = parseInt(event.target.value, 10);
    console.log("fsd");
    try {
      await axios.put(`http://localhost:4747/updateStatus/${item_id}`, {
        status: newStatus,
      });
      getContents();
    } catch (e) {
      console.error(e);
    }
  };
  const getContents = async () => {
    try {
      const response = await axios.get("http://localhost:4747/getProject");
      // console.log(response.data);
      const dataFetch = response.data;
      setData(dataFetch);
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getContents();
  }, [projects]);
  return (
    <div className="body">
      <ProjectBoxes projects={data} />
      <main className="table">
        <section className="table__header">
          <h1>Projects</h1>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Due Date</th>
                <th>Status</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.projectname}</td>
                  <td>
                    {(() => {
                      const duedate = new Date(item.duedate); // Convert timestamp string to Date object

                      return duedate instanceof Date && !isNaN(duedate)
                        ? duedate.toLocaleString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })
                        : "";
                    })()}
                  </td>
                  <td>
                    <select
                      name="status"
                      id="status"
                      value={item.status}
                      onChange={(event) => handleStatusChange(event, item._id)}
                    >
                      <option value="0">Not started</option>
                      <option value="1">Running</option>
                      <option value="2">Completed</option>
                    </select>
                  </td>
                  <td>
                    <button value={item._id} onClick={()=>openPopup(item._id)} className="editIcons edit1"><FontAwesomeIcon icon={faEdit}/></button>
                  </td>
                  <td>
                    <button value={item._id} className="editIcons delete" onClick={()=>deleteProject(item._id)}><FontAwesomeIcon  icon={faTrash}/></button>
                  </td>
                </tr>
              ))}       
            </tbody>
          </table>
        </section>
      </main>
      <Edit toOpen={editPopup} closeModal={closeModal} updateData={updateData} />
    </div>
  );
};

// const mapStateToProps=(state)=>({
//   projects:state.project.projects,
// });

const mapStateToProps=(state)=>{
  return{
    projects:state.projects,
  }
}

Body.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      projectname: PropTypes.string,
      projectdueDate: PropTypes.string,
    })
  ),};
// export default connect(mapStateToProps)(Body); 
const projectBody=connect(mapStateToProps,{addProject})(Body); 
export default projectBody;

