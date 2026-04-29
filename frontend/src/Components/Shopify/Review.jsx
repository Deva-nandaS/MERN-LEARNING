const Rev = ({ label, value }) => {
  return (
    <div className="flex justify-between">
      <span className="text-base">{label}:</span>
      <span className="text-black font-semibold">{value || "-"}</span>
    </div>
  );
};

export const Review = ({
  method,
  token,
  syncType,
  sourceName,
  storeUrl,
  startDate,
 
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <p className="font-bold text-2xl">Review Configuration</p>
      <p className="text-base text-gray-500">
        Review your step before creating the source.
      </p>
      <div className="border rounded-lg">
        <div className="flex flex-col p-3 text-gray-600 gap-2 ml-2">
          <Rev label="Source Name" value={sourceName} />
          <Rev label="Authentication" value={method} />
          <Rev label="Shopify Store" value={storeUrl} />
          <Rev label="Sync Schedule" value={syncType} />
          <Rev label="Start Date" value={startDate || "2024-01-01"} />
  
        </div>
      </div>
    </div>
  );
};
