import "./App.css";
import Sidebar from "./components/Sidebar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Body from './components/Body';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import NotStarted from "./components/NotStarted";
import Running from "./components/Running";
import Completed from "./components/Completed";

function App() {
  return (
    <>
        <Router>
          <ToastContainer />
          <div className="appContainer">
            <Sidebar />
          <div className="mainContent">
          <Routes>
            <Route path="/" exact element={<Body/>}/>
            <Route path='/notstarted' element={<NotStarted/>}/>
            <Route path='/running' element={<Running/>}/>
            <Route path='/completed' element={<Completed/>}/>
          </Routes>
          </div>
          </div>
        </Router>
    </>
  );
}

export default App;
//time created,time to finish,completed
