import { FiKey } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { LuShield } from "react-icons/lu";

export const Connect = ({
  method,
  setMethod,
  token,
  setToken,
  error,
  setError,
  touched,setTouched
}) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col mt-0">
        <p className="font-bold text-2xl">Connect Your Account</p>

        <p className="text-base text-gray-500">
          Choose how you want to authenticate with Shopify
        </p>
      </div>
      <p className="text-sm text-gray-700 font-semibold mt-2">
        Authentication Method
      </p>

      <div className="flex gap-4 mt-2">
        {/* OAUTH */}
        <div
          onClick={() => setMethod("oauth")}
          className={`w-1/2 rounded border p-6 cursor-pointer transition ${
            method === "oauth"
              ? "border-fuchsia-950 bg-purple-50"
              : "bg-gray-100 text-gray-400 hover:border-gray-400"
          }`}
        >
          <div
            className={`w-10 h-10 rounded border p-2 flex items-center justify-center ${
              method === "oauth" ? "bg-white" : "bg-gray-200"
            }`}
          >
            <FiKey
              size={20}
              className={method === "oauth" ? "text-black" : "text-gray-400"}
            />
          </div>
          <p className="font-bold mt-2">OAuth 2.0</p>

          <div className="flex justify-between items-start mt-2">
            <p
              className={`text-sm ${
                method === "oauth" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Connect your Shopify store via OAuth (coming soon)
            </p>

            {method === "oauth" && (
              <div className="ml-2 bg-fuchsia-950 w-4 h-4 text-white rounded-full flex items-center justify-center">
                <TiTick />
              </div>
            )}
          </div>
        </div>

        {/* ACCESS TOKEN */}
        <div
          onClick={() => setMethod("token")}
          className={`w-1/2 rounded border p-4 cursor-pointer transition ${
            method === "token"
              ? "border-fuchsia-950 bg-purple-50"
              : "bg-gray-100 text-gray-400 hover:border-gray-400"
          }`}
        >
              <div
            className={`w-10 h-10 rounded border p-2 flex items-center justify-center ${
              method === "token" ? "bg-white" : "bg-gray-200"
            }`}
          >
            < LuShield 
              size={20}
              className={method === "token" ? "text-black" : "text-gray-400"}
            />
          </div>
          <p className="font-bold mt-2">Access Token</p>

          <div className="flex justify-between items-start mt-2">
             <p
              className={`text-sm ${
                method === "oauth" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Enter your Shopify Private App access token manually
            </p>

            {method === "token" && (
              <div className="ml-2 bg-fuchsia-950 w-4 h-4 text-white rounded-full flex items-center justify-center">
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
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setError("");
            }}
            placeholder="Enter access token"
            className="mt-3 border p-2 w-full rounded"
          />
{touched && error && (
  <p className="text-red-600 text-sm mt-1">{error}</p>
)}
        </div>
      )}
    </div>
  );
};
