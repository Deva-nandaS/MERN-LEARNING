import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Login} from './Components/Login';
import './App.css';
import {Register} from './Components/Register';
import { ProtectedRoute } from "./Components/ProtectedRoutes";
import { Dashboard } from "./Components/Dashboard";


function App() {
  return (
      <Router>
        <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
       </Routes>
   </Router>

    
  );
}

export default App;
