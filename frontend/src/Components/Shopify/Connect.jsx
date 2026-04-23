import { FiKey } from "react-icons/fi";
import { TiTick } from "react-icons/ti";

export const Connect = ({
  method,
  setMethod,
  token,
  setToken,
  error,
  setError,
}) => {
  return (
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
              ? "border-fuchsia-950 bg-purple-50"
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
              <div className="bg-fuchsia-950 w-4 h-4 text-white rounded-full flex items-center justify-center">
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
            value={token}
            onChange={(e) => {
              setToken(e.target.value);   // ✅ fix
              setError("");               // ✅ fix
            }}
            placeholder="Enter access token"
            className="mt-3 border p-2 w-full rounded"
          />

          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}
        </div>
      )}
    </div>
  );
};