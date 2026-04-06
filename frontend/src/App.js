import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Login} from './pages/Login';
import {Notebooks} from './pages/Notebooks'
import { Platforms } from "./pages/Platforms";
import { Sources } from "./pages/Sources";
import {Builder} from "./pages/Builder"
import { Metrics } from "./pages/Metrics";
import { BusinessContext } from "./pages/BusinessContext";
import {Prompts} from "./pages/Prompts";
// import './App.css';
import {Register} from './pages/Register';
import { ProtectedRoute } from "./Components/ProtectedRoutes";
import { Dashboard } from "./pages/Dashboard";
import { PublicRoute } from "./Components/PublicRoute";
import { Schedules } from "./pages/Schedules";
import { AgentDetections } from "./pages/AgentDetections";
import { NewThread } from "./pages/NewThread";
import { AdminSettings } from "./pages/AdminSettings";
import { ChangePassword } from "./pages/ChangePassword";


function App() {

  return (
      <Router>
        <Routes>
      <Route path="/" element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
      <Route path="notebooks" element={<Notebooks/>}/>

      <Route path="integrations">
      <Route path="platforms" element={<Platforms/>}/>
      <Route path="sources" element={<Sources/>}/>
     </Route>

      <Route path="knowledge" >
      <Route path="builder" element={<Builder/>}/>
      <Route path="metrics" element={<Metrics/>}/>
      <Route path="businesscontext" element={<BusinessContext/>}/>
      <Route path="prompts" element={<Prompts/>}/>
     </Route>

       <Route path="automations">
      <Route path="schedules" element={<Schedules/>}/>
      <Route path="agentdetections" element={<AgentDetections/>}/>
     </Route>

  <Route path="newthread" element={<NewThread/>}/>
  <Route path="adminsettings" element={<AdminSettings/>}/>
  <Route path="changepassword" element={<ChangePassword/>}/>

   



     </Route>
      
     </Routes>
   </Router> 
  );
}

export default App;
