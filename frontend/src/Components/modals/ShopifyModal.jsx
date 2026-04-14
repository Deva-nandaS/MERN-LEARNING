import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../Button";
import { FiKey } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { useState } from "react";

export const ShopifyModal = ({ onClose }) => {
  const [method, setMethod] = useState("token");
  const [step,setStep]=useState(1)

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
                <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                <p className="font-semibold">Connect</p>
                <p className="text-sm text-gray-600">Authentication</p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="flex gap-3 mt-4 opacity-50">
              <div className="flex flex-col items-center">
                <div className="bg-gray-300 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                <p className="font-semibold">Configure</p>
                <p className="text-sm text-gray-600">Store Details</p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="flex gap-3 mt-4 opacity-50">
              <div className="flex flex-col items-center">
                <div className="bg-gray-300 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div>
                <p className="font-semibold">Sync Schedule</p>
                <p className="text-sm text-gray-600">Manual or automated</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
            {step===1 &&(
      <div className="flex flex-col w-2/3 p-6 gap-4">
            
            <p className="font-bold text-lg">Connect Your Account</p>

            <p className="text-sm text-gray-500">
              Choose how you want to authenticate with Shopify
            </p>

            <p className="text-sm text-gray-700">Authentication Method</p>

            <div className="flex gap-4 mt-2">

              {/* OAUTH */}
              <div
                onClick={() => setMethod("oauth")}
                className={`w-1/2 rounded border p-4 cursor-pointer transition ${
                  method === "oauth"
                    ? "border-purple-500 bg-purple-50"
                    : "bg-gray-100 hover:border-gray-400"
                }`}
              >
                <div className="w-10 h-10 rounded border p-2 bg-white">
                  <FiKey size={20} />
                </div>

                <p className="font-bold mt-2">OAuth 2.0</p>

                <p className="text-sm text-gray-600">
                  Connect your Shopify store via OAuth (coming soon)
                </p>

                {method === "oauth" && (
                  <div className="flex justify-end mt-2">
                    <div className="bg-purple-600 w-5 h-5 text-white rounded-full flex items-center justify-center">
                      <TiTick />
                    </div>
                  </div>
                )}
              </div>

              {/* ACCESS TOKEN */}
              <div
                onClick={() => setMethod("token")}
                className={`w-1/2 rounded border p-4 cursor-pointer transition ${
                  method === "token"
                    ? "border-purple-500 bg-purple-50"
                    : "bg-gray-100 hover:border-gray-400"
                }`}
              >
                <p className="font-bold">Access Token</p>

                <div className="flex justify-between items-start mt-2">
                  <p className="text-gray-600">
                    Enter your Shopify Private App access token manually
                  </p>

                  {method === "token" && (
                    <div className="ml-2 bg-purple-600 w-5 h-5 text-white rounded-full flex items-center justify-center">
                      <TiTick />
                    </div>
                  )}
                </div>

          
              
              </div>

            </div>

              {method === "token" && (
                <div>
                <label>Access Token</label>
                  <input
                    type="text"
                    placeholder="Enter access token"
                    className="mt-3 border p-2 w-full rounded"
                  />
                  </div>
                )}
          </div>
            
           )} 
    
        </div>

        {/* FOOTER */}
        <div className="flex border-t justify-end px-4 py-3 bg-gray-100">
          <div className="flex gap-2">
            <Button
              className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
              text="Cancel"
              onClick={onClose}
            />
            <Button
              className="bg-black text-white border rounded-md font-semibold w-32 py-2"
              text="Next"
               onClick={() => setStep((prev) => prev + 1)}
            />
          </div>
        </div>

      </div>
    </div>
  );
};