import { useState } from "react";
import { Button } from "../Components/Button";
import dataSources from "../data/dataSources.json";
import { LuRefreshCcw } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Breadcrumb } from "../Components/Breadcrumb";

export const Platforms = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState("postgres");

  const Label = ({ text, required }) => (
    <label className="text-sm font-semibold">
      {text}
      {required && <span className="text-red-500">*</span>}
    </label>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted successfully");
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b px-6 py-2 -mt-5">
        <Breadcrumb />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold">
              Data Source Connections
            </h1>
            <p className="text-gray-500">
              Manage and sync your connected data sources
            </p>
          </div>

          <Button
            onClick={() => setShowModal(true)}
            text="Add Data Source"
            className="bg-fuchsia-700 rounded px-4 py-2 text-white"
          />
        </div>

        {/* TABLE */}
        <div className="mt-7 border rounded-lg overflow-hidden bg-white">
          {/* IMPORTANT: scroll wrapper */}
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  {[
                    "NAME",
                    "TYPE",
                    "AUTH TYPE",
                    "STATUS",
                    "UPDATED BY",
                    "UPDATED AT",
                    "ACTIONS",
                  ].map((h) => (
                    <th key={h} className="p-4 border border-gray-300">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {dataSources.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300">{item.name}</td>
                    <td className="p-4 border border-gray-300">{item.type}</td>
                    <td className="p-4 border border-gray-300">
                      {item.authType}
                    </td>
                    <td className="p-4 border border-gray-300">
                      {item.status}
                    </td>
                    <td className="p-4 border border-gray-300">
                      {item.updatedBy}
                    </td>
                    <td className="p-4 border border-gray-300">
                      {item.updatedAt}
                    </td>
                    <td className="p-4 border border-gray-300">
                      <div className="flex gap-4">
                        <LuRefreshCcw className="cursor-pointer text-gray-500" />
                        <FaRegEdit className="cursor-pointer" />
                        <FaRegTrashAlt className="text-red-700 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Footer */}
              <tfoot>
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 border-t border-gray-300 text-gray-500"
                  >
                    <div className="flex flex-wrap gap-2 items-center">
                      <span>
                        Showing 1 to {dataSources.length} of{" "}
                        {dataSources.length} results
                      </span>

                      <span>Show:</span>

                      <select className="border border-gray-300 rounded px-2 py-1">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                      </select>

                      <span>per page</span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start md:items-center justify-center pt-16 md:pt-0 overflow-y-auto">
            <div
              className="bg-white w-full max-w-5xl mx-4 mt-10 mb-10 rounded shadow-lg max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
                <h2 className="text-xl font-bold">Add Data Source</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
                >
                  <IoCloseSharp />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col md:flex-row w-full"
                >
                  {/* LEFT SIDEBAR (FIXED TOP ALIGN) */}
                  <div className="w-full md:w-[160px] border-b md:border-b-0 md:border-r flex md:flex-col flex-row items-start md:items-start justify-start gap-3 p-3">
                    {[
                      { id: "snowflake", icon: "/Snowflake.png" },
                      { id: "bigquery", icon: "/BigQuery.png" },
                      { id: "postgres", icon: "/postgreSQL.png" },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedSource(item.id)}
                        className={`w-24 md:w-32 h-16 md:h-20 flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-gray-300 ${
                          selectedSource === item.id ? "border-fuchsia-700" : ""
                        }`}
                      >
                        <img
                          src={item.icon}
                          alt={item.id}
                          className="w-20 md:w-24 h-auto"
                        />
                      </div>
                    ))}
                  </div>

                  {/* RIGHT CONTENT (SCROLLABLE) */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    {selectedSource === "postgres" && (
                      <>
                        <h2 className="text-xl font-bold">
                          PostgreSQL Connection
                        </h2>

                        <p className="text-sm text-gray-600 uppercase font-bold mt-3">
                          Connection Details
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          {[
                            "Name your Connection",
                            "Host",
                            "Database",
                            "User",
                            "Password",
                            "Port",
                          ].map((label, i) => (
                            <div key={i}>
                              <Label text={label} required />
                              <input
                                required
                                type="text"
                                placeholder={label}
                                className="border border-gray-300 p-2 rounded w-full"
                              />
                            </div>
                          ))}

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
                              <LuRefreshCcw />
                              Fetch
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
                    )}

                    {selectedSource !== "postgres" && (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        Form coming soon...
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
