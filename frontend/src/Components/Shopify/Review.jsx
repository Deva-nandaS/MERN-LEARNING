export const Review = ({
  sourceName,
  method,
  token,
  storeName,
  syncType,
  startDate,
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <p className="font-bold text-2xl">Review Configuration</p>

      <p className="text-base text-gray-500">
        Review your setup before creating the source.
      </p>

      <div className="flex flex-col border w-[500px] rounded-lg p-5 gap-3">
        
        {/* Source Name */}
        <div className="flex justify-between">
          <p className="text-gray-500">Source Name:</p>
          <p className="font-medium">{sourceName || "Not provided"}</p>
        </div>

        {/* Authentication */}
        <div className="flex justify-between">
          <p className="text-gray-500">Authentication:</p>
          <p className="font-medium">
            {method === "token" ? "Access Token" : "OAuth"}
          </p>
        </div>

        {/* Shopify Store */}
        <div className="flex justify-between">
          <p className="text-gray-500">Shopify Store:</p>
          <p className="font-medium">{storeName || "Not provided"}</p>
        </div>

        {/* Sync Schedule */}
        <div className="flex justify-between">
          <p className="text-gray-500">Sync Schedule:</p>
          <p className="font-medium">
            {syncType || "Not selected"}
          </p>
        </div>

        {/* Start Date */}
        <div className="flex justify-between">
          <p className="text-gray-500">Start Date:</p>
          <p className="font-medium">
            {startDate || "Not set"}
          </p>
        </div>

      </div>
    </div>
  );
};