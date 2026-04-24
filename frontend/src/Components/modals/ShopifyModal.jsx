import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../Button";
import { useState } from "react";

import { Connect } from "../Shopify/Connect";
import { Configure } from "../Shopify/Configure";
import { Sync } from "../Shopify/Sync";
import { Review } from "../Shopify/Review";

export const ShopifyModal = ({ onClose }) => {
  const [method, setMethod] = useState("token");
  const [step, setStep] = useState(1);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [syncType, setSyncType] = useState("");
  const [sourceName, setSourceName] = useState("");
const [storeUrl, setStoreUrl] = useState("");
const [startDate, setStartDate] = useState("");

  const handleCreate = async () => {
    const payload = {
      method,
      token,
      syncType,
    };

    try {
      const res = await fetch("http://localhost:5000/api/shopify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);

      setStep(5); // ✅ go to success screen
    } catch (err) {
      console.error(err);
    }
  };

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
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT STEPPER */}
          <div className="w-1/4 border-r p-4 bg-gray-100">
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
                    step === 1 ? "text-black" : "text-gray-400"
                  }`}
                >
                  Connect
                </p>
                <p className="text-sm text-gray-400">Authentication</p>
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
                    step === 2 ? "text-black" : "text-gray-400"
                  }`}
                >
                  Configure
                </p>
                <p className="text-sm text-gray-400">Store Details</p>
              </div>
            </div>

            {/* STEP 3 */}

            <div className={`flex gap-3 mt-4 ${step < 3 ? "opacity-50" : ""}`}>
              <div className="flex flex-col items-center">
                <div
                  className={`  w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 3
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
                    step === 3 ? "text-black" : "text-gray-400"
                  }`}
                >
                  Sync Schedule
                </p>
                <p className="text-sm text-gray-400">Manual or Automated</p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className={`flex gap-3 mt-4 ${step < 4 ? "opacity-50" : ""}`}>
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
                    step === 4 ? "text-black" : "text-gray-400"
                  }`}
                >
                  Review Configuration
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto min-w-0">
            {/* RIGHT SIDE */}
            {step === 1 && (
              <Connect
                method={method}
                setMethod={setMethod}
                token={token}
                setToken={setToken}
                error={error}
                setError={setError}
                touched={setTouched}
              />
            )}

           {step === 2 && (
  <Configure
    sourceName={sourceName}
    setSourceName={setSourceName}
    storeUrl={storeUrl}
    setStoreUrl={setStoreUrl}
    startDate={startDate}
    setStartDate={setStartDate}
  />
)}

            {step === 3 && (
              <Sync syncType={syncType} setSyncType={setSyncType} />
            )}

            {step === 4 && (
              <Review method={method} token={token} syncType={syncType} />
            )}

            {step === 5 && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="text-green-600 text-5xl mb-4">✔</div>
                <h2 className="text-xl font-semibold">
                  Source Created Successfully!
                </h2>
              </div>
            )}
          </div>

          {/* body end */}
        </div>

        {/* FOOTER */}
        <div className="flex border-t justify-end px-4 py-3 bg-gray-100">
          <div className="flex gap-4">
            <div>
              {step === 1 && (
                <div className="flex gap-3">
                  <Button
                    text="Cancel"
                    className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
                    onClick={onClose}
                  />
                  <Button
                    className="bg-black text-white border rounded-md font-semibold w-32 py-2"
                    text="Next"
                    onClick={() => {
                      setTouched(true);

                      if (method === "token" && token.trim() === "") {
                        setError("Access Token required");
                        return;
                      }

                      setStep(2);
                    }}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="flex gap-3">
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
                <div className="flex gap-3">
                  {" "}
                  <Button
                    className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
                    text="Back"
                    onClick={() => setStep(2)}
                  />
                  <Button
                    className="bg-black text-white border rounded-md font-semibold w-32 py-2"
                    text="Next"
                    onClick={() => setStep(4)}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="flex gap-3">
                  {" "}
                  <Button
                    className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
                    text="Back"
                    onClick={() => setStep(3)}
                  />
                  <Button
                    className="bg-black text-white border rounded-md font-semibold w-32 py-2"
                    text="Create Source"
                    onClick={handleCreate}
                  />
                </div>
              )}
              {step === 5 && (
                <Button
                  className="bg-black text-white border rounded-md font-semibold w-32 py-2"
                  text="Done"
                  onClick={onClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
