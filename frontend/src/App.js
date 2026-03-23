import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Login} from './pages/Login';
// import './App.css';
import {Register} from './pages/Register';
import { ProtectedRoute } from "./Components/ProtectedRoutes";
import { Dashboard } from "./pages/Dashboard";
import { PublicRoute } from "./Components/PublicRoute";


function App() {

  return (
      <Router>
        <Routes>
      <Route path="/" element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      
       </Routes>
   </Router> 
  );
}

export default App;
