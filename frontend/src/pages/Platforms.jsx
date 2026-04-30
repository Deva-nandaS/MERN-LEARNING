import { useState } from "react";
import { Button } from "../Components/ui/Button";
import dataSources from "../data/dataSources.json";
import { LuRefreshCcw } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Breadcrumb } from "../Components/Breadcrumb";
import { CgDanger } from "react-icons/cg";
import { LuTriangleAlert } from "react-icons/lu";
import { BaseModal } from "../Components/ui/Modal";
import { useEffect } from "react";
import { Input } from "../Components/ui/Input";

export const Platforms = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState("snowflake");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sources, setSources] = useState(dataSources);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (showAddModal || showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAddModal, showDeleteModal]);
  const [formData, setFormData] = useState({
    name: "",
    host: "",
    database: "",
    user: "",
    password: "",
    port: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const Label = ({ text, required }) => (
    <label className="text-sm font-semibold">
      {text}
      {required && <span className="text-red-500">*</span>}
    </label>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      // UPDATE existing row
      setSources((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id ? { ...item, ...formData } : item,
        ),
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        updatedAt: new Date().toLocaleDateString(),
      };

      setSources((prev) => [...prev, newItem]);
    }

    // reset
    setShowAddModal(false);
    setIsEditMode(false);
  };
  const handleDelete = () => {
    setSources((prev) => prev.filter((item) => item.id !== selectedItem.id));

    setShowDeleteModal(false);
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
            onClick={() => setShowAddModal(true)}
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
                {sources.map((item) => (
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
                        <div>
                          <FaRegEdit
                            className="cursor-pointer"
                            onClick={() => {
                              setIsEditMode(true);
                              setSelectedItem(item);

                              setFormData({
                                name: item.name || "",
                                host: item.host || "",
                                database: item.database || "",
                                user: item.user || "",
                                password: item.password || "",
                                port: item.port || "",
                              });
                              setShowAddModal(true);
                            }}
                          />
                        </div>

                        <div>
                          {" "}
                          <FaRegTrashAlt
                            className="text-red-700 cursor-pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowDeleteModal(true);
                            }}
                          />
                        </div>
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
   {showAddModal && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    
    {/* MODAL BOX */}
    <div
      className="bg-white w-full max-w-5xl mx-4 my-10 rounded-lg shadow-lg max-h-[90vh] flex flex-col overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
        <h2 className="text-xl font-bold">
          {isEditMode ? "Edit Data Source" : "Add Data Source"}
        </h2>

        <button
          onClick={() => setShowAddModal(false)}
          className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
        >
          <IoCloseSharp />
        </button>
      </div>

      {/* BODY */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row w-full"
        >
          {/* LEFT SIDEBAR */}
          <div className="w-full md:w-[160px] border-b md:border-b-0 md:border-r flex md:flex-col flex-row items-start gap-3 p-3">
            {[
              { id: "snowflake", icon: "/Snowflake.png" },
              { id: "bigquery", icon: "/BigQuery.png" },
              { id: "postgres", icon: "/postgreSQL.png" },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedSource(item.id)}
                className={`w-24 md:w-32 h-16 md:h-20 flex items-center justify-center cursor-pointer border-2 rounded-lg
                  ${
                    selectedSource === item.id
                      ? "border-fuchsia-700 bg-fuchsia-50"
                      : "border-gray-200 hover:border-gray-400"
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

          {/* RIGHT CONTENT */}
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
                    { label: "Name your Connection", name: "name" },
                    { label: "Host", name: "host" },
                    { label: "Database", name: "database" },
                    { label: "User", name: "user" },
                    { label: "Password", name: "password" },
                    { label: "Port", name: "port" },
                  ].map((field, i) => (
                    <div key={i}>
                      <Label text={field.label} required />
                      <Input
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        type="text"
                        placeholder={field.label}
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </div>
                  ))}

                  <div className="col-span-2 flex gap-2 items-end">
                    <div className="flex-1">
                      <label>Schema</label>
                      <select className="border border-gray-300 p-2 rounded w-full">
                        <option>select schema</option>
                        <option>abc</option>
                        <option>def</option>
                        <option>ghi</option>
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
              <div className="flex items-center justify-center h-full text-gray-400" />
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
)}
        {/* DeleteModal */}
        <BaseModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <div className="bg-white w-[500px] rounded shadow-lg flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
              <h2 className="text-2xl font-bold">Delete Data Source</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 bg-red-700 text-white rounded"
              >
                <IoCloseSharp />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <div className="flex items-center h-[80px] border bg-gray-100 rounded-md p-3">
                <div className="w-[50px] h-[50px] bg-white rounded-md" />
                <div className="ml-3">
                  <div className="font-semibold">{selectedItem?.name}</div>
                  <div className="text-gray-500">{selectedItem?.type}</div>
                  <div className="text-xs bg-gray-300 w-fit px-2 rounded">
                    ID: {selectedItem?.id}
                  </div>
                </div>
              </div>

              {/* WARNINGS */}
              <div className="mt-4  text-base">
                <p className="font-semibold">What will happen:</p>

                <div className="text-gray-600 mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <CgDanger /> Permanently remove this data source connection.
                  </div>
                  <div className="flex items-center gap-2">
                    <CgDanger /> Stop all active sync jobs forthis source.
                  </div>
                  <div className="flex items-center gap-2">
                    <CgDanger /> Remove all associated sync history.
                  </div>
                </div>
              </div>

              {/* ALERT */}
              <div className="mt-4 bg-red-100 border border-red-300 p-3 rounded flex items-center gap-2 text-red-600 font-bold">
                <LuTriangleAlert />
                This action cannot be undone
              </div>

              {/* ACTIONS */}
              <div className="flex justify-center gap-4 mt-6 px-6">
                <Button
                  text="Cancel"
                  onClick={() => setShowDeleteModal(false)}
                  className="border rounded-md font-semibold bg-gray-100  text-black w-1/2 text-lg "
                />
                <Button
                  text="Delete Data Source"
                  className="bg-red-600 text-white rounded-md font-bold  w-1/2 py-3 text-lg"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        </BaseModal>
      </div>
    </div>
  );
};
