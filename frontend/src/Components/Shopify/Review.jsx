export const Review = ({ method, token, syncType, sourceName, storeUrl, startDate }) => {
    return(
         <div className="flex flex-col w-full gap-4">
            <p className="font-bold text-2xl">Review Configuration</p>
            <p className="text-base text-gray-500">
                Review your step before creating the source.
            </p>
           <div className="flex flex-col p-3 text-gray-600 gap-2 ml-2">
    <div className="flex justify-between"><span>Source Name</span><span className="text-black">{sourceName || "-"}</span></div>
    <div className="flex justify-between"><span>Authentication</span><span className="text-black">{method || "-"}</span></div>
    <div className="flex justify-between"><span>Shopify Store</span><span className="text-black">{storeUrl || "-"}</span></div>
    <div className="flex justify-between"><span>Sync Schedule</span><span className="text-black">{syncType || "-"}</span></div>
    <div className="flex justify-between"><span>Start Date</span><span className="text-black">{startDate || "2024-01-01"}</span></div>
</div>
        </div>
    )
}