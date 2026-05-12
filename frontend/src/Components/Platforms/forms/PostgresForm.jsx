import { useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { Input } from "../../ui/Input";
import { FormError } from "../../ui/FormError";

const Label = ({ text, required }) => (
  <label className="text-sm font-semibold">
    {text}
    {required && <span className="text-red-500">*</span>}
  </label>
);

export const PostgresForm = ({
  formData,
  onChange,
  authType,
  setAuthType,
  errors,
}) => {
  return (
    <>
      <h2 className="text-xl font-bold mt-3">PostgreSQL Connection</h2>
      <p className="text-sm text-gray-600 uppercase font-bold mt-8">
        Connection Detail
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {/* BASIC FIELDS */}
        {[
          { label: "Connection Name", name: "name" },
          { label: "Host", name: "host" },
          { label: "Database", name: "database" },
          { label: "User", name: "user" },
          { label: "Port", name: "port" },
        ].map((field, i) => (
          <div key={i}>
            <Label text={field.label} required />
            <Input
              name={field.name}
              value={formData[field.name] ?? ""}
              onChange={onChange}
              type="text"
              placeholder={field.label}
              className="border border-gray-300 p-2 rounded w-full mt-2"
            />

            <FormError message={errors?.[field.name]} />
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
              onClick={() => setAuthType("ssl")}
              className={`px-4 py-2 rounded border text-sm font-medium transition ${
                authType === "ssl"
                  ? "bg-fuchsia-900 text-white border-fuchsia-900"
                  : "bg-white text-gray-600 border-gray-300 hover:border-fuchsia-400"
              }`}
            >
              SSL Certificate
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

            <FormError message={errors?.password} />
          </div>
        )}

        {/* SSL */}
        {authType === "ssl" && (
          <>
            <div className="col-span-2">
              <Label text="SSL Certificate" required />
              <textarea
                name="sslCert"
                value={formData.sslCert ?? ""}
                onChange={onChange}
                rows={4}
                placeholder="-----BEGIN CERTIFICATE-----"
                className="border border-gray-300 p-2 rounded w-full font-mono text-xs"
              />

              <FormError message={errors?.sslCert} />
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
    </>
  );
};
