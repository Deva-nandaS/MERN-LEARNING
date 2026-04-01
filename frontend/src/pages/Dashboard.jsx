import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  // 
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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

 
  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
  <div className="flex h-screen overflow-hidden relative">
    
    <Sidebar 
      user={user}
      onUserClick={() => setShowProfileMenu(prev => !prev)}
    />

    {/* Main content */}
    <div className="flex-1 p-8 overflow-auto">
      <Outlet />
    </div>

    {/* Profile Popup */}
    {showProfileMenu && (
  <div className="absolute bottom-20 left-72 bg-white shadow-xl rounded-xl p-4 w-64 z-50">
    
    {/* User Info */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
        {user?.email?.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-semibold">Fig User</p>
        <p className="text-sm text-gray-500 border-b">{user?.email}</p>
      </div>
    </div>

<Button
  text="Admin Settings"
  onClick={() => navigate("/dashboard/AdminSettings")}
  className="w-full  bg-fuchsia-900 text-white px-4 py-2 rounded "
/>


  <Button
  text="Change password"
  onClick={() => navigate("/dashboard/ChangePassword")}
  className="w-full mt-3 bg-fuchsia-900 text-white px-4 py-2 rounded"
/>

    <Button
    text="Logout"
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/");
      }}
      className="w-full mt-3 bg-red-700 text-white py-2 rounded-md"
    />
    

  </div>
)}

  </div>
);
};
