import "../styles/ProjectBoxes.css";
import { useState,useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClock } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment-timezone';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const NotStarted = () => {
  const colorPalette = ["#e0ebf2", "#eadccf", "#f2e5d7", "#d7f2e5", "#f2dbd7"];
  const [remainingTimes,setRemainingTimes]=useState({});
  const [data,setData]=useState([]);
  const [color, setColor] = useState({});
  const getContents = async () => {
    try {
      const response = await axios.get("http://localhost:4747/getProject/0");
      const dataFetch = response.data;
      setData(dataFetch);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(()=>{
    getContents();
  },[]);

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
    const dummyRemainingTimes={};
    const getRemainingTime=()=>{
      data.forEach((dat)=>{
        const dueDate=new Date(dat.duedate);
        const myTimeZone=moment.tz.guess();
        const localDueDate=moment.tz(dueDate,myTimeZone);
        const currentLocalDate=moment.tz(myTimeZone);
        const remainingTimemls=localDueDate.diff(currentLocalDate);
        const duration=moment.duration(remainingTimemls);
        const remainingTime={
          days:duration.days(),
          hours:duration.hours(),
          minutes:duration.minutes(),
          seconds:duration.seconds(),
        }
        dummyRemainingTimes[dat._id]=`${remainingTime.days}d ${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`;
      });
      setRemainingTimes(dummyRemainingTimes);
    }
    const intervalId=setInterval(getRemainingTime,1000);
    return()=>{
      clearInterval(intervalId);
    };
  },[remainingTimes]);
  return (
    <div className="projectBoxes">
    {data.map((project) => (
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

export default NotStarted;