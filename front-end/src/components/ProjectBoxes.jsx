import PropTypes from "prop-types";
import "../styles/ProjectBoxes.css";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment-timezone';

const ProjectBoxes = ({ projects }) => {
  const colorPalette = ["#e0ebf2", "#e1dacc", "#d6d7dc", "#d3e1df", "#f2dbd7",'#cfcbc9','#c5cfd4','#eadccf','#d8d3da','#e0d4d5','#eeefed'];
  const [color, setColor] = useState({});
  const [remainingTimes,setRemainingTimes]=useState({});


  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
  };
  const getColor = (projectId) => {
    if (color[projectId]) {
      return color[projectId];
    } else {
      const color = getRandomColor();
      setColor((prevColorMap) => ({
        ...prevColorMap,
        [projectId]: color, 
      }));
      return color;
    }
  };
  useEffect(()=>{
    console.log(remainingTimes);
      const getRemainingTime=()=>{
        const dummyRemainingTimes={};
        projects.forEach((project)=>{
          const dueDate=new Date(project.duedate);
          const myTimeZone=moment.tz.guess();
          const localDueDate=moment.tz(dueDate, myTimeZone);
          const getCurrentTime=moment.tz(myTimeZone);
          const getRemainingTimeMls=localDueDate.diff(getCurrentTime);
          // console.log(getRemainingTimeMls);
          const getDuration=moment.duration(getRemainingTimeMls);
          const remainingTime={
            days:getDuration.days(),
            hours:getDuration.hours(),
            mins:getDuration.minutes(),
            secs:getDuration.seconds(),
          };
          dummyRemainingTimes[project._id]=`${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.mins}m ${remainingTime.secs}s`;
        });
        setRemainingTimes(dummyRemainingTimes);
      }
        getRemainingTime();
        const intervalId=setInterval(getRemainingTime,1000);

        return ()=>{
          clearInterval(intervalId);
        };
  },[projects]);
  return (
    <div className="projectBoxes">
      {projects.map((project) => (
        <div
          className="box"
          key={project._id}
          style={{ background: getColor(project._id) }}
        >
          <p className="date">
            {(() => {
              const duedate = new Date(project.duedate);

              return duedate instanceof Date && !isNaN(duedate)
                ? duedate.toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "";
            })()}
          </p>
          <p className="time">
            {(() => {
              const duedate = new Date(project.duedate);
              // console.log(project.duedate);

              return duedate instanceof Date && !isNaN(duedate)
                ? duedate.toLocaleString(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                  })
                : "";
            })()}
          </p>
          {/* <p className="remainingtime">
            {(() => {
              const duedate = new Date(project.duedate);

              const myTimeZone = moment.tz.guess();
              const localDueDate = moment.tz(duedate, myTimeZone);
              const currentLocalDate = moment.tz(myTimeZone);
              const remainingMilliseconds = localDueDate.diff(currentLocalDate);
              // console.log(remainingMilliseconds);

              const remainingDuration = moment.duration(remainingMilliseconds);
              const remainingTime = {
                days: remainingDuration.days(),
                hours: remainingDuration.hours(),
                minutes: remainingDuration.minutes(),
                seconds: remainingDuration.seconds(),
              };
              return `${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`;
            })()}
          </p> */}

          <div className="fontAwesome">
            <FontAwesomeIcon icon={faClock} className="clock-icon"/>
          </div>
          <h2>{project.projectname}</h2>
          <p className="remainingtime">{remainingTimes[project._id]}</p>
        </div>
      ))}
    </div>
  );
};

ProjectBoxes.propTypes = {
  projects: PropTypes.array.isRequired,
};
export default ProjectBoxes;
