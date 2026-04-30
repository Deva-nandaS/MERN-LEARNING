import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";

export const Login = () => {
  const [email, setEmail] = useState("iop@gmail.com");
  const [password, setPassword] = useState("123");
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
    <div className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE */}
      <div className="md:flex md:w-1/2 justify-center items-center">
        <img className="w-1/3" src="/FigLogo.png" alt="FigLogo" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4"
        >
          <div className="max-w-sm mx-auto w-full">
            <h4 className="text-black text-2xl sm:text-3xl mb-4 font-semibold text-center">
              Sign In
            </h4>

            <p className="text-center">
              Not registered yet?{" "}
              <Link to="/register" className="text-blue-500">
                Sign Up
              </Link>
            </p>

            <div className="border-b my-10" />

            {/* EMAIL */}
            <Input
              label="Email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
              required
            />

            {/* PASSWORD */}
            <div className="flex items-center justify-between mt-4">
              <label className="font-bold">Password</label>
              <Link to="" className="text-blue-500">
                Forgot password?
              </Link>
            </div>

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 mb-4"
              required
            />

            {/* BUTTON */}
            <Button
              text="SIGN IN"
              type="submit"
              className="w-full bg-gray-900 text-white font-bold mt-2 rounded-lg py-2"
            />
          </div>

          <div className="mt-auto text-center text-gray-300">
            <p>
              Powered by <span className="font-bold">SuperTokens</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};