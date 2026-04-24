export const Sync = ({ syncType, setSyncType }) => {
  return (
    <div className="flex flex-col w-full  gap-4">
      <p className="font-bold text-2xl">Sync Schedule</p>

      <p className="text-base text-gray-500">
        Choose whether this source syncs only when triggered manually or on an
        automatic schedule.
      </p>
<div className="flex items-center gap-3">
  {/* MANUAL */}
  <div
    onClick={() => setSyncType("manual")}
    className={`border w-1/2 rounded-lg cursor-pointer transition ${
      syncType === "manual"
        ? "bg-fuchsia-50 border-fuchsia-900"
        : "bg-gray-100 hover:border-gray-400"
    }`}
  >
    <div className="p-3 flex flex-col">
      <p
        className={`font-bold ${
          syncType === "manual" ? "text-black" : "text-gray-500"
        }`}
      >
        Manual Sync
      </p>
      <p
        className={`text-sm ${
          syncType === "manual" ? "text-gray-600" : "text-gray-500"
        }`}
      >
        Run syncs only when you trigger them from the sources page
      </p>
    </div>
  </div>

  {/* SCHEDULED */}
  <div
    onClick={() => setSyncType("scheduled")}
    className={`border w-1/2  rounded-lg cursor-pointer transition ${
      syncType === "scheduled"
        ? "bg-fuchsia-50 border-fuchsia-900"
        : "bg-gray-100 hover:border-gray-400"
    }`}
  >
    <div className="p-3 flex flex-col">
      <p
        className={`font-bold ${
          syncType === "scheduled" ? "text-black" : "text-gray-500"
        }`}
      >
        Scheduled Sync
      </p>
      <p
        className={`text-sm ${
          syncType === "scheduled" ? "text-gray-600" : "text-gray-500"
        }`}
      >
        Set a recurring cron schedule for automatic data sync
      </p>
    </div>
  </div>
</div>
    </div>
  );
};
