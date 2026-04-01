import { useState } from "react";
import { Button } from "../Components/Button";
import dataSources from "../data/dataSources.json";

export const Platforms = () => {
  const [showModal, setShowModal] = useState(false);

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
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-[800px] p-6 rounded shadow-lg"
            onClick={(e)=>e.stopPropagation()}
            >
{/* add dataSource+close */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Add Data Source</h2>
              <Button className="bg-red-700 p-2 text-white" text="X" onClick={()=>setShowModal(false)}/>
            </div >
{/* body */}
            <div className="flex h-[400px]">
              {/* left */}
              <div className="w-1/3 border-r flex flex-col">
              <div >PostgreSQL</div>
              <div>Google</div>
              <div>SnowFlake</div>
              </div>
            
            {/* right */}
            <div className="flex flex-col gap-3 w-2/3 p-4">
            <h2  className="font-bold text-xl">PostgreSQL Connection</h2>
            <p className="text-gray-600 text-sm uppercase font-bold">Connection Details</p>

            <div className="flex gap-3">
            <label>Name your connection</label>
            <input type="text" placeholder="(eg.test_postgresql)" className="border border-gray p-2 rounded" />
            <label>Host</label>
            <input type="text" placeholder="(eg.12.321.1233)" className="border border-gray p-2 rounded" />
            </div>

            </div>
            </div>


          </div>
          </div>
        )}
    </div>
  );
};
