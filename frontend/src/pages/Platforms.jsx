import { useState } from "react";
import { Button } from "../Components/Button";
import dataSources from "../data/dataSources.json";

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
      <div className="bg-white shadow mt-7 text-sm">
        <table className="w-full text-left border border-gray-300 border-collapse">
          {/* Header */}
          <thead className="bg-gray-200 text-gray-600 text-xs uppercase">
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
              <tr key={item.id}>
                <td className="p-4 border border-gray-300">{item.name}</td>
                <td className="p-4 border border-gray-300">{item.type}</td>
                <td className="p-4 border border-gray-300">{item.authType}</td>
                <td className="p-4 border border-gray-300">{item.status}</td>
                <td className="p-4 border border-gray-300">{item.updatedBy}</td>
                <td className="p-4 border border-gray-300">{item.updatedAt}</td>
                <td className="p-4 border border-gray-300"></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center gap-2 p-4 text-gray-500 border-t border-gray-300">
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
                text="✕"
                className="text-white hover:text-black bg-red-700 px-2"
                onClick={() => setShowModal(false)}
              />
            </div>
            {/* body */}
            <div className="flex px-6 pb-6">
              {/* left */}
              <div className="w-[90px] border-r flex flex-col items-center py-4">
                {[{ id: "postgres", icon:"/image.png" }].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedSource(item.id)}
                    className={`w-14 h-14 flex items-center justify-center rounded-lg border cursor-pointer ${
                      selectedSource === item.id
                        ? "border-fuchsia-700"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={item.id}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* right */}
              <div className="flex flex-col gap-3 w-full p-4">
                <h2 className="font-bold text-xl">PostgreSQL Connection</h2>
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

                  <div className=" col-span-2 flex items-end gap-2">
                    <div className="flex flex-col flex-1">
                      <label className="">Schema</label>
                      <select className="border border-gray-300 text-gray-400 p-2 rounded w-full">
                        <option >select or type schemas(eg.public)</option>
                      </select>
                    </div>

                    <Button
                      text="Fetch"
                      className="px-6 py-2 rounded border "
                    />
                  </div>
                </div>
                <div>
                  <Button
                    text="Submit"
                    className=" w-full rounded bg-fuchsia-900 py-2 mt-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
