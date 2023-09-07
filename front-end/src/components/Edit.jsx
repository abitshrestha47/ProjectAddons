import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Edit.css";
import axios from "axios";
import {toast} from 'react-toastify';

const Edit = ({ toOpen, closeModal,updateData }) => {
  const projectId = toOpen.projectId;
  const [editprojectname, seteditprojectname] = useState("");
  const [editdate, setEditDate] = useState("");
  const editdateISO = "2023-09-02T09:17:00.000Z";
  const dateObject = new Date(editdateISO);
  const formattedDate = dateObject.toISOString().slice(0, 16);

  // const [projectname,setProjectName]=useState('');
  const handleClose = () => {
    closeModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4747/editproject/${projectId}`,
        {
          editprojectname,
          editdate,
        }
      );
      console.log(response);
      if(response.status === 200){
        toast.success("Project updated successfully.");
        seteditprojectname('');
        setEditDate('');
        const updatedProjectData = {
            projectname: editprojectname,
            duedate: editdate,
          };
        updateData(updatedProjectData);
        handleClose();
      }
    } catch (err) {
      console.log(`ERROR:${err.message}`);
    }
  };

  const getProjectData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4747/getprojectdata/${projectId}`,
        {
          projectId,
        }
      );
      console.log(response);
      const data = response.data;
      seteditprojectname(data.projectname);
      setEditDate(data.duedate);
    } catch (err) {
      console.log(`ERROR:${err.message}`);
    }
  };
  useEffect(() => {
    if (toOpen.isOpen) {
      getProjectData();
    }
  }, [toOpen.isOpen, projectId]);
  return (
    <div className={`edit ${toOpen.isOpen ? "show" : ""}`}>
      <button className="close-btn" onClick={handleClose}>
        &times;
      </button>
      <h1>Edit</h1>
      <div className="edit-contents">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Project Name</label>
          <input
            type="text"
            value={editprojectname}
            onChange={(e) => seteditprojectname(e.target.value)}
          />
          <label htmlFor="" className="dueDateLabel">Due Date</label>
          <input
            type="datetime-local"
            value={formattedDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <button className="modalBtn">Edit</button>
        </form>
      </div>
    </div>
  );
};

Edit.propTypes = {
  toOpen: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    projectId: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};
export default Edit;
