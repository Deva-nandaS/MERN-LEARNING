export const Review = ({ method, token, syncType }) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <p className="font-bold text-2xl">Review Configuration</p>

      <p className="text-base text-gray-500">
        Review your setup before creating the source.
      </p>

      <div className="flex flex-col border w-[500px] h-[180px] rounded-lg p-4 gap-2">
        
        <div className="flex justify-between">
          <p className="text-gray-500">Authentication:</p>
          <p className="font-medium">
            {method === "token" ? "Access Token" : "OAuth"}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">Access Token:</p>
          <p className="font-medium">
            {token ? "************" : "Not provided"}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">Sync Schedule:</p>
          <p className="font-medium">
            {syncType || "Not selected"}
          </p>
        </div>

      </div>
    </div>
  );
};