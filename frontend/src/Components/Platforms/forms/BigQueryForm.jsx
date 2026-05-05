import { LuRefreshCcw } from "react-icons/lu";
import { Input } from "../../ui/Input";

const Label = ({ text, required }) => (
  <label className="text-sm font-semibold">
    {text}
    {required && <span className="text-red-500">*</span>}
  </label>
);

export const BigQueryForm = ({ formData, onChange, errors }) => (
  <>
    <h2 className="text-xl font-bold">BigQuery Connection</h2>
    <p className="text-sm text-gray-600 uppercase font-bold mt-3">
      Connection Details
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
      {/* BASIC FIELDS */}
      {[
        { label: "Connection Name", name: "name" },
        { label: "Project ID", name: "projectId" },
        { label: "Dataset", name: "dataset" },
        { label: "Location", name: "location" },
      ].map((field, i) => (
        <div key={i}>
          <Label text={field.label} required={field.name !== "location"} />
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

      {/* SERVICE ACCOUNT JSON */}
      <div className="col-span-2">
        <Label text="Service Account JSON" required />
        <textarea
          name="serviceAccountJson"
          value={formData.serviceAccountJson ?? ""}
          onChange={onChange}
          rows={6}
          placeholder={`{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\\n...",
  "client_email": "your-service-account@project.iam.gserviceaccount.com"
}`}
          className="border border-gray-300 p-2 rounded w-full font-mono text-xs"
        />
        {errors?.serviceAccountJson && (
          <p className="text-red-500 text-xs mt-1">{errors.serviceAccountJson}</p>
        )}
      </div>

      {/* OPTIONAL FETCH */}
      <div className="col-span-2 flex gap-2 items-end">
        <div className="flex-1">
          <label>Dataset (optional fetch)</label>
          <select className="border border-gray-300 p-2 rounded w-full">
            <option>select dataset</option>
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