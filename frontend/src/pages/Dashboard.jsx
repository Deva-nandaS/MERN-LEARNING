import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  console.log("useEffect ran"); // ← add this first
  console.log("Token:", localStorage.getItem("token"));
  
  const fetchDashboard = async () => {
    console.log("fetchDashboard ran"); // ← add this too
    try {
        const data = await getDashboard();
        console.log("Full response:", data); // what does this print?
        console.log("data.data:", data.data); // is this null or undefined?
        setUser(data.data);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 p-8">
      <h1>Welcome {user.email}</h1>
      <Button text="LOGOUT" onClick={handleLogout} className="w-auto" />
      </div>
    </div>
  );
};
