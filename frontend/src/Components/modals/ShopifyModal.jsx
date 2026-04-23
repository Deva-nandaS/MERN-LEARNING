import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../Button";
import {useState } from "react";

import { Connect } from "../Shopify/Connect";

export const ShopifyModal = ({ onClose }) => {
  const [method, setMethod] = useState("token");
  const [step, setStep] = useState(1);
  const[token,setToken]=useState("")
  const[error,setError]=useState("")

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg w-[900px] h-[500px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
          <div className="flex items-center gap-2">
            <img src="/shopify.png" alt="shopify" className="w-10 h-10" />
            <h2 className="text-xl font-bold">Set up Shopify</h2>
          </div>

          <IoCloseSharp
            className="text-xl cursor-pointer hover:text-red-500"
            onClick={onClose}
          />
        </div>

        {/* BODY */}
        <div className="flex flex-1">
          {/* LEFT STEPPER */}
          <div className="w-1/3 border-r p-4 bg-gray-100">
            {/* STEP 1 (ACTIVE) */}

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={` w-10 h-10 rounded-full flex items-center justify-center font-bold${
                    step >= 1
                      ? " bg-fuchsia-950 text-white"
                      : "bg-gray-300 text-gray-600 "
                  }`}
                >
                  1
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    step === 1 ? "text-black" : "text-gray-600"
                  }`}
                >
                  Connect
                </p>
                <p className="text-sm text-gray-600">Authentication</p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className={`flex gap-3 mt-4 ${step < 2 ? "opacity-50" : ""}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`  w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 2
                      ? " bg-fuchsia-950 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    step === 2 ? "text-black" : "text-gray-600"
                  }`}
                >
                  Configure
                </p>
                <p className="text-sm text-gray-600">Store Details</p>
              </div>
            </div>

            {/* STEP 3 */}
    
            <div className={`flex gap-3 mt-4 ${step < 3 ? "opacity-50" : ""}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`  w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 2
                      ? " bg-fuchsia-950 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    step === 2 ? "text-black" : "text-gray-600"
                  }`}
                >
                  Sync 
                </p>
                <p className="text-sm text-gray-600">Store Details</p>
              </div>
            </div>

            
            {/* STEP 4 */}
            <div className={`flex gap-3 mt-4 ${step < 2 ? "opacity-50" : ""}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`  w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 4
                      ? " bg-fuchsia-950 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  4
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    step === 2 ? "text-black" : "text-gray-600"
                  }`}
                >
                  Review Configuration
                </p>
            
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          {step === 1 && (
  <Connect
    method={method}
    setMethod={setMethod}
    token={token}
    setToken={setToken}
    error={error}
    setError={setError}
  />
)}
          
          {/* body end */}
        </div>

        {/* FOOTER */}
        <div className="flex border-t justify-end px-4 py-3 bg-gray-100">
          <div className="flex gap-2">
            <div>
              {step === 1 && (
                <div>
                  <Button
                    text="Cancel"
                    className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
                    onClick={onClose}
                  />
                  <Button
                    className="bg-black text-white border rounded-md font-semibold w-32 py-2"
                    text="Next"
                    onClick={() => {
                      if(method==="token" && token===""){
                        setError("Access Token required")
                        return;
                      }
                    setStep(2)
                    }}
                  />
                </div>
              )}

              {step ===2 && (
                <div>
                  <Button
                    className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
                    text="Back"
                    onClick={() => setStep(1)}
                  />
                
                    <Button
                      className="bg-black text-white border rounded-md font-semibold w-32 py-2"
                      text="Next"
                      onClick={() => setStep(3)}
                    />
                    </div>
              )}

                  {step === 3 && (
                    <>
                    <Button
                      className="bg-black text-white border rounded-md font-semibold w-32 py-2"
                      text="Next"
                      onClick={() => setStep(4)}
                    />
                        <Button
                    className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
                    text="Back"
                    onClick={() => setStep(2)}
                  />
                  </>
                  )}
                </div>
                
              
            </div>
          </div>
        </div>
      </div>
  
  );
};
