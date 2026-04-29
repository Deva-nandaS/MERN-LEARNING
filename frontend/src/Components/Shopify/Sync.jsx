import { useState } from "react";

const pad = (n) => String(n).padStart(2, "0");
const range = (s, e) => Array.from({ length: e - s + 1 }, (_, i) => s + i);

const FREQUENCY_OPTIONS = [
  { label: "Hourly", value: "hourly" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
  { label: "Custom", value: "custom" },
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function buildCron(freq, s) {
  switch (freq) {
    case "hourly":  return `${s.hourlyMin} * * * *`;
    case "daily":   return `${s.dailyM} ${s.dailyH} * * *`;
    case "weekly":  return `${s.weekM} ${s.weekH} * * ${[...s.weekDays].sort().join(",")}`;
    case "monthly": return `${s.monthM} ${s.monthH} ${s.monthDay} * *`;
    case "yearly":  return `0 0 1 1 *`;
    case "custom":  return s.custom || "* * * * *";
    default:        return "* * * * *";
  }
}

function buildHuman(freq, s) {
  switch (freq) {
    case "hourly":  return `Every hour at :${pad(s.hourlyMin)}`;
    case "daily":   return `Every day at ${pad(s.dailyH)}:${pad(s.dailyM)}`;
    case "weekly":  return `Every ${[...s.weekDays].sort().map(d => DAYS[d]).join(", ")} at ${pad(s.weekH)}:${pad(s.weekM)}`;
    case "monthly": return `Monthly on day ${s.monthDay} at ${pad(s.monthH)}:${pad(s.monthM)}`;
    case "yearly":  return `Every year on Jan 1 at midnight`;
    case "custom":  return `Custom schedule`;
    default:        return "";
  }
}

const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col items-center gap-1">
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border border-gray-300 rounded-md px-2 py-1.5 text-sm text-center w-20 bg-white outline-none focus:ring-2 focus:ring-fuchsia-300"
    >
      {options.map((v) => <option key={v} value={v}>{pad(v)}</option>)}
    </select>
    <span className="text-xs text-gray-400">{label}</span>
  </div>
);

const TimePicker = ({ h, m, onH, onM }) => (
  <div className="flex items-end gap-2">
    <SelectField label="Hour" value={h} onChange={onH} options={range(0, 23)} />
    <span className="text-gray-300 text-lg pb-5">:</span>
    <SelectField label="Minute" value={m} onChange={onM} options={range(0, 59)} />
  </div>
);

export const Sync = ({ syncType, setSyncType, cron, setCron }) => {
  const [freq, setFreq] = useState(null);
  const [s, setS] = useState({
    hourlyMin: 0,
    dailyH: 0, dailyM: 0,
    weekDays: [1], weekH: 0, weekM: 0,
    monthDay: 1, monthH: 0, monthM: 0,
    custom: "",
  });

  const update = (patch, currentFreq) => {
    const next = { ...s, ...patch };
    setS(next);
    setCron(buildCron(currentFreq ?? freq, next));
  };

  const handleFreq = (f) => {
    setFreq(f);
    setCron(buildCron(f, s));
  };

  const toggleDay = (i) => {
    const days = s.weekDays.includes(i)
      ? s.weekDays.length > 1 ? s.weekDays.filter((d) => d !== i) : s.weekDays
      : [...s.weekDays, i];
    update({ weekDays: days });
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <p className="font-bold text-2xl">Sync Schedule</p>
      <p className="text-base text-gray-500">
        Choose whether this source syncs only when triggered manually or on an automatic schedule.
      </p>

      {/* Sync type cards */}
      <div className="flex gap-3">
        <div
          onClick={() => { setSyncType("manual"); setFreq(null); setCron(""); }}
          className={`flex-1 border rounded-lg cursor-pointer p-3 ${
            syncType === "manual" ? "bg-fuchsia-50 border-fuchsia-900" : "bg-gray-100 border-transparent"
          }`}
        >
          <p className="font-bold text-sm">Manual Sync</p>
          <p className="text-gray-600 text-sm mt-1">Run syncs only when you trigger them from the sources page.</p>
        </div>
        <div
          onClick={() => setSyncType("scheduled")}
          className={`flex-1 border rounded-lg cursor-pointer p-3 ${
            syncType === "scheduled" ? "bg-fuchsia-50 border-fuchsia-900" : "bg-gray-100 border-transparent"
          }`}
        >
          <p className="font-bold text-sm">Scheduled Sync</p>
          <p className="text-gray-600 text-sm mt-1">Set a recurring cron schedule for automatic syncing.</p>
        </div>
      </div>

      {/* Scheduler box */}
      {syncType === "scheduled" && (
        <div className="border border-gray-200 rounded-xl bg-white p-5 flex flex-col gap-5">

          {/* Frequency pills across the top */}
          <div className="flex flex-wrap gap-2">
            {FREQUENCY_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handleFreq(value)}
                className={`px-4 py-1.5 rounded-full border text-sm transition ${
                  freq === value
                    ? "bg-fuchsia-900 text-white border-fuchsia-900"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Controls */}
          {freq && (
            <div className="flex flex-col gap-4">
              {freq === "hourly" && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">At minute past the hour</p>
                  <div className="flex flex-wrap gap-2">
                    {[0, 5, 10, 15, 20, 30, 45].map((v) => (
                      <button
                        key={v}
                        onClick={() => update({ hourlyMin: v })}
                        className={`px-3 py-1 rounded-full border text-sm transition ${
                          s.hourlyMin === v
                            ? "bg-fuchsia-900 text-white border-fuchsia-900"
                            : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                        }`}
                      >
                        :{pad(v)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {freq === "daily" && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Every day at</p>
                  <TimePicker
                    h={s.dailyH} m={s.dailyM}
                    onH={(v) => update({ dailyH: v })}
                    onM={(v) => update({ dailyM: v })}
                  />
                </div>
              )}

              {freq === "weekly" && (
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">On days</p>
                    <div className="flex gap-2">
                      {DAYS.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => toggleDay(i)}
                          className={`w-9 h-9 rounded-full border text-xs font-medium transition ${
                            s.weekDays.includes(i)
                              ? "bg-fuchsia-900 text-white border-fuchsia-900"
                              : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">At time</p>
                    <TimePicker
                      h={s.weekH} m={s.weekM}
                      onH={(v) => update({ weekH: v })}
                      onM={(v) => update({ weekM: v })}
                    />
                  </div>
                </div>
              )}

              {freq === "monthly" && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">On day of month at</p>
                  <div className="flex items-end gap-2">
                    <SelectField label="Day" value={s.monthDay} onChange={(v) => update({ monthDay: v })} options={range(1, 31)} />
                    <div className="pb-5 text-gray-300 text-sm">@</div>
                    <TimePicker
                      h={s.monthH} m={s.monthM}
                      onH={(v) => update({ monthH: v })}
                      onM={(v) => update({ monthM: v })}
                    />
                  </div>
                </div>
              )}

              {freq === "yearly" && (
                <p className="text-sm text-gray-500">Runs once a year on <span className="font-medium text-gray-700">January 1st at midnight</span>.</p>
              )}

              {freq === "custom" && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Enter a cron expression</p>
                  <input
                    type="text"
                    value={s.custom}
                    onChange={(e) => update({ custom: e.target.value })}
                    placeholder="e.g. 0 9 * * 1-5"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm font-mono outline-none focus:ring-2 focus:ring-fuchsia-300"
                  />
                  <p className="text-xs text-gray-400 mt-1">Format: minute hour day month weekday</p>
                </div>
              )}

              {/* Cron output */}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-1">
                <p className="text-xs text-gray-400">Cron expression</p>
                <p className="font-mono text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                  {buildCron(freq, s)}
                </p>
                <p className="text-xs text-gray-500">{buildHuman(freq, s)}</p>
              </div>
            </div>
          )}

          {!freq && (
            <p className="text-sm text-gray-400">Select a frequency above to configure the schedule.</p>
          )}
        </div>
      )}
    </div>
  );
};