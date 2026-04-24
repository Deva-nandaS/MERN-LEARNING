import { AiOutlineInfoCircle } from "react-icons/ai";

export const Configure = ({
  sourceName,
  setSourceName,
  storeUrl,
  setStoreUrl,
  startDate,
  setStartDate,
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <p className="font-bold text-2xl ml-3">Configure Source</p>

      <p className="text-base text-gray-500 ml-3">
        Name your source and enter your Shopify store details.
      </p>

      {/* Source Name */}
      <div className="flex flex-col ml-3">
        <label className="font-semibold">Source Name</label>
        <input
          type="text"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
          placeholder="e.g., shopify_prod"
          className="mt-2 border p-2 w-full rounded"
        />
      </div>

      {/* Shopify Store */}
      <div className="flex flex-col ml-3">
        <div className="flex gap-2 items-center">
          <label className="font-semibold">Shopify Store</label>
          <AiOutlineInfoCircle size={15} className="text-gray-400" />
        </div>

        <input
          type="text"
          value={storeUrl}
          onChange={(e) => setStoreUrl(e.target.value)}
          placeholder="my-store or my-store.myshopify.com"
          className="mt-2 border p-2 w-full rounded"
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-col ml-3">
        <label className="font-semibold">Start Date (optional)</label>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-2 border p-2 w-full rounded"
        />

        <p className="text-gray-600 text-sm mt-1">
          Earliest date to sync data from. If not set, defaults to 2024-01-01.
        </p>
      </div>
    </div>
  );
};