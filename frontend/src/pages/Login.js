import React, { useState } from "react";
import { loginUser } from "../api/auth";
import {Link,useNavigate} from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token",data.token)

      alert(data.message);
      navigate("/dashboard")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" placeholder="Email" 
          value={email} onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Password" 
          value={password} onChange={(e) => setPassword(e.target.value)} required 
        />
        <button type="submit">Login</button>
      <Link to="/register">Not registered yet?</Link>
      </form>
     
    </div>
  );
};

