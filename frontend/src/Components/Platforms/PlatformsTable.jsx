import { LuRefreshCcw } from "react-icons/lu";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export const PlatformsTable = ({ sources, onEdit, onDelete }) => (
  <div className="mt-7 border rounded-lg overflow-hidden bg-white">
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
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="p-4 border border-gray-300">{item.name}</td>
              <td className="p-4 border border-gray-300">{item.type}</td>
              <td className="p-4 border border-gray-300">
                {item.authType || "N/A"}
              </td>
              
              <td className="p-4 border border-gray-300">{item.status}</td>
              <td className="p-4 border border-gray-300">{item.updatedBy}</td>
              <td className="p-4 border border-gray-300">
                {item.updatedAt
                  ? new Date(item.updatedAt).toLocaleString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </td>
              <td className="p-4 border border-gray-300">
                <div className="flex gap-4">
                  <LuRefreshCcw className="cursor-pointer text-gray-500" />
                  <FaRegEdit
                    className="cursor-pointer"
                    onClick={() => onEdit(item)}
                  />
                  <FaRegTrashAlt
                    className="text-red-700 cursor-pointer"
                    onClick={() => onDelete(item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td
              colSpan="7"
              className="p-4 border-t border-gray-300 text-gray-500"
            >
              <div className="flex flex-wrap gap-2 items-center">
                <span>
                  Showing 1 to {sources.length} of {sources.length} results
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
);
