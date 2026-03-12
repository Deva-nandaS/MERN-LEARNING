import axios from "axios";

export const getDashboard=async()=>{
  const token=localStorage.getItem("token")
  const response = await axios.get("http://localhost:5000/api/dashboard", { 
    headers:{
      Authorization: `Bearer ${token}`
    }
      });
    return response.data;
 
}
