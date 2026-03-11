import React, { useState } from "react";
import { registerUser } from "../api/auth";
import {Link,useNavigate} from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(email, password);
      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" placeholder="Email" 
          value={email} onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Password" 
          value={password} onChange={(e) => setPassword(e.target.value)} required 
        />
        <button type="submit">Register</button>
      </form>
      <p >Already have an account?<Link to="/" >Login here</Link></p>
    </div>
  );
};

