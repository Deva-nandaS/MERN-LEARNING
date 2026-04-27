import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiCalendarAlt } from "react-icons/bi";
import { useRef } from "react";

export const Configure = ({
  sourceName,
  setSourceName,
  storeUrl,
  setStoreUrl,
  startDate,
  setStartDate,
}) => {
  const dateRef = useRef(null);

  return (
    <div className="flex flex-col w-full gap-5 px-3">
      <div>
        <p className="font-bold text-2xl">Configure Source</p>
        <p className="text-sm text-gray-500 mt-1">
          Name your source and enter your Shopify store details.
        </p>
      </div>

      {/* Source Name */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Source Name</label>
        <input
          type="text"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
          placeholder="e.g., shopify_prod"
          className="border border-gray-300 p-2.5 rounded-md w-full text-sm outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Shopify Store */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <label className="font-semibold text-sm">Shopify Store</label>
          <AiOutlineInfoCircle size={14} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={storeUrl}
          onChange={(e) => setStoreUrl(e.target.value)}
          placeholder="my-store or my-store.myshopify.com"
          className="border border-gray-300 p-2.5 rounded-md w-full text-sm outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Start Date (optional)</label>
        <div
          className="flex items-center border border-gray-300 rounded-md px-3 py-2.5 cursor-pointer"
          onClick={() => dateRef.current?.showPicker()}
        >
          <span
            className={`flex-1 text-sm ${startDate ? "text-gray-800" : "text-gray-400"}`}
          >
            {startDate || "dd-mm-yyyy"}
          </span>
          <BiCalendarAlt className="text-gray-500 text-lg" />
          <input
            ref={dateRef}
            type="date"
            defaultValue=""
            onChange={(e) => setStartDate(e.target.value)}
            className="w-0 h-0 opacity-0 absolute"
          />
        </div>
        <p className="text-xs text-gray-500">
          Earliest date to sync data from. If not set, defaults to 2024-01-01.
        </p>
      </div>
    </div>
  );
};
