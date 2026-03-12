import React, { useState } from "react";
import { loginUser } from "../api/auth";
import {Link,useNavigate} from "react-router-dom";
import {Button} from "../Components/Button"

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token",data.data.token)

      alert(data.message);
      navigate("/dashboard")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h4 className="flex justify-center text-black font-semibold text-2xl ">Sign In</h4>
      <form className="sm (640px)" onSubmit={handleSubmit}>
        <input 
          type="email" placeholder="Email" 
          value={email} onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Password" 
          value={password} onChange={(e) => setPassword(e.target.value)} required 
        />
        <Button text="SIGN IN" type="submit"/>
      <Link to="/register">Not registered yet?</Link>
      </form>
     
    </div>
  );
};

