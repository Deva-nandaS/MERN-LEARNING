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
  const [selectedSource, setSelectedSource] = useState("PostgreSQL");
  const Label = ({ text, required }) => (
    <label className="text-sm font-semibold">
      {text}
      {required && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div>
      <div className="border-b px-6 py-2 -mt-5">
        <Breadcrumb />
      </div>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold">Data Source Connections</h1>
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

      {/* Table */}
<div className="bg-white mt-7 text-sm border rounded-lg overflow-hidden">
  <table className="w-full text-left border-collapse">

    {/* Header */}
    <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
      <tr>
        <th className="p-4 border border-gray-300">NAME</th>
        <th className="p-4 border border-gray-300">TYPE</th>
        <th className="p-4 border border-gray-300">AUTH TYPE</th>
        <th className="p-4 border border-gray-300">STATUS</th>
        <th className="p-4 border border-gray-300">UPDATED BY</th>
        <th className="p-4 border border-gray-300">UPDATED AT</th>
        <th className="p-4 border border-gray-300">ACTIONS</th>
      </tr>
    </thead>

    {/* Body */}
    <tbody>
      {dataSources.map((item) => (
        <tr key={item.id} className="hover:bg-gray-50">
          <td className="p-4 border border-gray-300">{item.name}</td>
          <td className="p-4 border border-gray-300">{item.type}</td>
          <td className="p-4 border border-gray-300">{item.authType}</td>
          <td className="p-4 border border-gray-300">{item.status}</td>
          <td className="p-4 border border-gray-300">{item.updatedBy}</td>
          <td className="p-4 border border-gray-300">{item.updatedAt}</td>
          <td className="p-4 border border-gray-300">
            <div className="flex items-center gap-7">
              <LuRefreshCcw className="text-gray-500" />
              <FaRegEdit />
              <FaRegTrashAlt className="text-red-700" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Footer */}
 <tfoot>
  <tr>
    <td colSpan="7" className="p-4 border-t border-gray-300 text-gray-500">
      <div className="flex items-center gap-2">
        <span>
          Showing 1 to {dataSources.length} of {dataSources.length} results
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
</div>
        {showModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div
              className="bg-white w-[1000px]  rounded shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* add dataSource+close */}
              <div className="flex items-center justify-between py-2 px-6 border-b bg-gray-100">
                <h2 className="font-bold text-xl">Add Data Source</h2>
                <Button
                  text={<IoCloseSharp />}
                  className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
                  onClick={() => setShowModal(false)}
                />
              </div>
              {/* body */}
              <div className="flex px-6 pb-6 min-h-[500px]">
                {/* left */}
                <div className="w-[150px] border-r flex flex-col items-center py-4 gap-4">
                  {[
                    { id: "snowflake", icon: "/Snowflake.png" },
                    { id: "bigquery", icon: "/BigQuery.png" },
                    { id: "postgres", icon: "/postgreSQL.png" },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedSource(item.id)}
                      className={`w-36 h-20 p-2 mr-3  flex items-center justify-center  cursor-pointer border-2 border-transparent hover:border-gray-300 ${
                        selectedSource === item.id ? "border-fuchsia-700" : ""
                      }`}
                    >
                      <img
                        src={item.icon}
                        alt={item.id}
                        className="w-24 h-12"
                      />
                    </div>
                  ))}
                </div>

                {/* right */}
                <div className="flex flex-col gap-3 w-full p-4 min-h-[400px]">
                  {selectedSource === "postgres" && (
                    <>
                      <h2 className="font-bold text-xl">
                        PostgreSQL Connection
                      </h2>
                      <p className="text-gray-600 text-sm uppercase font-bold mt-3">
                        Connection Details
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label text="Name your Connection" required />
                          <input
                            type="text"
                            placeholder="(eg.test_postgresql)"
                            className="border border-gray p-2 rounded w-full"
                          />
                        </div>

                        <div>
                          <Label text="Host" required />
                          <input
                            type="text"
                            placeholder="(eg.12.321.1233)"
                            className="border border-gray p-2 rounded w-full"
                          />
                        </div>

                        <div>
                          <Label text="Database" required />
                          <input
                            type="text"
                            placeholder="(my_yellow_taxi_data)"
                            className="border border-gray p-2 rounded w-full"
                          />
                        </div>

                        <div>
                          <Label text="User" required />
                          <input
                            type="text"
                            placeholder="(eg.postgres)"
                            className="border border-gray p-2 rounded w-full"
                          />
                        </div>

                        <div>
                          <Label text="Password" required />
                          <input
                            type="text"
                            placeholder="Enter your password"
                            className="border border-gray p-2 rounded w-full"
                          />
                        </div>

                        <div>
                          <Label text="Port" required />
                          <input
                            type="text"
                            placeholder="(eg.0432)"
                            className="border border-gray-300 p-2 rounded w-full"
                          />
                        </div>

                        <div className="col-span-2 flex items-end gap-2">
                          <div className="flex flex-col flex-1">
                            <label>Schema</label>
                            <select className="border border-gray-300 text-gray-400 p-2 rounded w-full">
                              <option>select or type schemas(eg.public)</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-3 rounded border px-6 py-2">
                            <LuRefreshCcw />
                            <Button text="Fetch" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Button
                          text="Submit"
                          className="w-full rounded bg-fuchsia-900 py-2 mt-3"
                        />
                      </div>
                    </>
                  )}
                  {selectedSource === "bigquery" && (
                    <div className="flex items-center justify-center h-full text-gray-400 font-medium"></div>
                  )}

                  {selectedSource === "snowflake" && (
                    <div className="flex items-center justify-center h-full text-gray-400 font-medium"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
