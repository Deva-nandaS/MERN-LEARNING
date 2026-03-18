import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.data.token);

      alert(data.message);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className=" flex h-screen">
      <div className="w-1/2 flex justify-center items-center">
        {" "}
        {/* left side */}
        <img className="w-1/2" src="/FigLogo.png" alt="FigLogo" />
      </div>

      <div className="w-1/2 flex justify-center items-center bg-white  ">
        {" "}
        {/* right side */}
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col rounded-xl shadow-2xl p-8 w-[480px] h-[520px] mt-16 ml-44"
        >
          {" "}
          {/* login card */}
          <div className="max-w-sm mx-auto w-full">
            {" "}
            {/* Top items */}
            <h4 className=" text-black text-3xl mb-4 font-semibold text-center w-full">
              Sign In
            </h4>
          
              <p className="text-center ">
                Not registered yet?{" "}
                <Link to="/register" className="text-blue-500">
                  Sign Up
                </Link>
              </p>

            <div className="border-b my-10"></div>

            <label className="font-bold mb-2 block ">Email</label>
            <input
              className="border-2 rounded-lg w-full p-2 mb-4  "
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex items-center justify-between mt-4">
              {" "}
              {/* password div */}
              <label className="font-bold">Password</label>
              <Link to="/register" className="text-blue-500">
                Forgot password?
              </Link>
            </div>

            <input
              className="border-2 rounded-lg w-full p-2 mb-4 mt-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
      
          <Button text="SIGN IN" type="submit" />
          </div>
          <div className="mt-auto text-center text-gray-300 ">
              <p
              
              
              
              
              >Powered by<span className="font-bold">SuperTokens</span></p>
              </div>
                 </form>
        
       
      </div>
    </div>
  );
};
