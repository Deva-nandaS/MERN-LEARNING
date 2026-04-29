import React from "react";
import Cron from "react-cron-generator";

export const CronScheduler = ({ cronValue, setCronValue }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold text-sm">
        Schedule Sync (Cron Builder)
      </label>

      <div className="border rounded-md p-3 bg-white">
        <Cron
          value={cronValue}
          setValue={setCronValue}
          showResultText={true}
        />
      </div>

      <p className="text-xs text-gray-500">
        Select hourly / daily / weekly / monthly / yearly or custom schedule
      </p>
    </div>
  );
};