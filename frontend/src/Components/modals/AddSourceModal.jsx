import { IoCloseSharp } from "react-icons/io5";
import { BaseModal } from "../ui/Modal";
import { PostgresForm } from "../Platforms/forms/PostgresForm";
import { SnowflakeForm } from "../Platforms/forms/SnowflakeForm";
import { BigQueryForm } from "../Platforms/forms/BigQueryForm";

export const AddSourceModal = ({
  isOpen,
  onClose,
  isEditMode,
  formData,
  handleChange,
  handleSubmit,
  selectedSource,
  setSelectedSource,
  authType,
  setAuthType,
  errors,
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
    <div className="bg-white w-full max-w-5xl mx-4 my-10 rounded-lg shadow-lg h-[600px] flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
          <h2 className="text-xl font-bold">
            {isEditMode ? "Edit Data Source" : "Add Data Source"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row flex-1 overflow-hidden"
        >
          {/* LEFT SIDEBAR */}
          <div className="w-full md:w-[160px] border-b md:border-b-0 md:border-r flex md:flex-col flex-row items-start gap-3 p-3">
            {[
              { id: "snowflake", icon: "/Snowflake.png" },
              { id: "bigquery", icon: "/BigQuery.png" },
              { id: "postgres", icon: "/postgreSQL.png" },
            ].map((src) => (
              <div
                key={src.id}
                onClick={() => setSelectedSource(src.id)}
                className={`w-24 md:w-32 h-16 md:h-20 flex items-center justify-center cursor-pointer border-2 rounded-lg ${
                  selectedSource === src.id
                    ? "border-fuchsia-700 bg-fuchsia-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={src.icon}
                  alt={src.id}
                  className="w-20 md:w-24 h-auto"
                />
              </div>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 p-4 overflow-y-auto min-h-[500px]">
            {selectedSource === "postgres" && (
              <PostgresForm
                formData={formData}
                onChange={handleChange}
                authType={authType}
                setAuthType={setAuthType}
                errors={errors}
              />
            )}
            {selectedSource === "snowflake" && (
              <SnowflakeForm
                formData={formData}
                onChange={handleChange}
                authType={authType}
                setAuthType={setAuthType}
                errors={errors}
              />
            )}
            {selectedSource === "bigquery" && (
              <BigQueryForm
                formData={formData}
                onChange={handleChange}
                errors={errors}
              />
            )}
             <button
        type="submit"
        className="w-1/2 bg-fuchsia-900 text-white py-2 rounded mt-4 ml-32"
      >
        Submit
      </button>
          </div>
          
        </form>
      </div>
      
    </BaseModal>
  );
};