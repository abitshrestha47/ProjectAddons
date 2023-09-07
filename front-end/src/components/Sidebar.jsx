import "../styles/Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks,faClock,faSpinner, faCircleCheck,faHouse} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CreateProjectModal from '../components/CreateProjectModal';
import {Link,useLocation} from 'react-router-dom'


const Sidebar = () => {
    const [isModalOpen,setIsModalOpen]=useState(false);
    const openModal=()=>{
        setIsModalOpen(true);
    }
    const location=useLocation();
    const closeModal=()=>{
      setIsModalOpen(false);
    }
  return (
    <>
        <div className="sideBar">
        <div className="menus">
          <div className="logo">
            <FontAwesomeIcon icon={faTasks}/>
            <h5>Project Management</h5>
          </div>
          <ul>
            <Link to="/"><li className={location.pathname==='/'?'active':''} title="Home"><FontAwesomeIcon icon={faHouse}/></li></Link>
            <Link to="/notstarted"><li className={location.pathname==='/notstarted'?'active':''} title="Not Started"><FontAwesomeIcon icon={faClock}/></li></Link>
            <Link to="/running"><li className={location.pathname==='/running'?'active':''} title="Running"><FontAwesomeIcon icon={faSpinner}/></li></Link>
            <Link to="/completed"><li className={location.pathname==='/completed'?'active':''} title="Completed"><FontAwesomeIcon icon={faCircleCheck}/></li></Link>
          </ul>
        </div>
        <div className="createNew">
          <button className="btn" onClick={openModal}>+</button>
        </div>
      </div>
      <CreateProjectModal isOpen={isModalOpen} closeModal={closeModal}/>
    </>
  );
};
export default Sidebar;
