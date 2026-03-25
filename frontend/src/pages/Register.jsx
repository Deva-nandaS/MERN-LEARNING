import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { Link} from "react-router-dom";
import { Button } from "../Components/Button";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[confirmPassword,setConfirmPassword]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password!==confirmPassword){
      alert("Password mismatch")
      return;
    }
    try {
      const data = await registerUser(email, password);
      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
     <div className=" flex flex-col md:flex-row h-screen">
       <div className="hidden md:flex md:w-1/2  justify-center items-center">
        {" "}
        {/* left side */}
        <img className="w-1/3" src="/FigLogo.png" alt="FigLogo" />
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center bg-white  ">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4"
        >
          <div className="max-w-sm mx-auto w-full">
            <h4 className=" text-black text-2xl sm:text-3xl mb-4 font-semibold text-center">
              Register
            </h4>

            <p className="text-center">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500">
                Login here
              </Link>
            </p>
            <div className="border-b my-10"></div>

            <label className="font-bold mb-2 block ">Email</label>
            <input
              className="border-2 rounded-lg w-full p-2 mb-4  "
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="font-bold">Password</label>
            <input
              className="border-2 rounded-lg w-full p-2 mb-4 mt-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

             <label className="font-bold">Confirm Password</label>
            <input
              className="border-2 rounded-lg w-full p-2 mb-4 mt-2"
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button text="REGISTER" type="submit"  className="w-full"/>
          </div>
          <div className="mt-auto text-center text-gray-300 ">
            <p>
              Powered by<span className="font-bold">SuperTokens</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
