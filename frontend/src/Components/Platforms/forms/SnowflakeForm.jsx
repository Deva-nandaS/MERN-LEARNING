import { LuRefreshCcw } from "react-icons/lu";
import { Input } from "../../ui/Input";

const Label = ({ text, required }) => (
  <label className="text-sm font-semibold">
    {text}{required && <span className="text-red-500">*</span>}
  </label>
);

export const SnowflakeForm = ({ formData, onChange, authType, setAuthType, errors }) => {
  return (
    <>
      <h2 className="text-xl font-bold">Snowflake Connection</h2>
      <p className="text-sm text-gray-600 uppercase font-bold mt-3">
        Connection Details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {/* BASIC FIELDS */}
        {[
          { label: "Connection Name", name: "name" },
          { label: "Account Identifier", name: "account" },
          { label: "Warehouse", name: "warehouse" },
          { label: "Database", name: "database" },
          { label: "Username", name: "user" },
          { label: "Role", name: "role" },
        ].map((field, i) => (
          <div key={i}>
            <Label text={field.label} required={field.name !== "role"} />
            <Input
              name={field.name}
              value={formData[field.name] ?? ""}
              onChange={onChange}
              type="text"
              placeholder={field.label}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors?.[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {/* AUTH TYPE SELECTION */}
        <div className="col-span-2">
          <Label text="Auth Type" required />
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={() => setAuthType("password")}
              className={`px-4 py-2 rounded border text-sm font-medium transition ${
                authType === "password"
                  ? "bg-fuchsia-900 text-white border-fuchsia-900"
                  : "bg-white text-gray-600 border-gray-300 hover:border-fuchsia-400"
              }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setAuthType("privateKey")}
              className={`px-4 py-2 rounded border text-sm font-medium transition ${
                authType === "privateKey"
                  ? "bg-fuchsia-900 text-white border-fuchsia-900"
                  : "bg-white text-gray-600 border-gray-300 hover:border-fuchsia-400"
              }`}
            >
              Private Key
            </button>
          </div>
        </div>

        {/* PASSWORD */}
        {authType === "password" && (
          <div className="col-span-2">
            <Label text="Password" required />
            <Input
              name="password"
              value={formData.password ?? ""}
              onChange={onChange}
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        )}

        {/* PRIVATE KEY */}
        {authType === "privateKey" && (
          <>
            <div className="col-span-2">
              <Label text="Private Key" required />
              <textarea
                name="privateKey"
                value={formData.privateKey ?? ""}
                onChange={onChange}
                rows={4}
                placeholder="-----BEGIN RSA PRIVATE KEY-----"
                className="border border-gray-300 p-2 rounded w-full font-mono text-xs"
              />
              {errors?.privateKey && (
                <p className="text-red-500 text-xs mt-1">{errors.privateKey}</p>
              )}
            </div>
            <div>
              <Label text="Private Key Passphrase" />
              <Input
                name="privateKeyPassphrase"
                value={formData.privateKeyPassphrase ?? ""}
                onChange={onChange}
                type="password"
                placeholder="Passphrase (optional)"
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>
          </>
        )}

        {/* SCHEMA */}
        <div className="col-span-2 flex gap-2 items-end">
          <div className="flex-1">
            <label>Schema</label>
            <select className="border border-gray-300 p-2 rounded w-full">
              <option>select schema</option>
            </select>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 border px-4 py-2 rounded"
          >
            <LuRefreshCcw /> Fetch
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-fuchsia-900 text-white py-2 rounded mt-4"
      >
        Submit
      </button>
    </>
  );
};