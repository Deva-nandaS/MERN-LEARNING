export const Sync=()=>{
    return(
            <div className="flex flex-col w-2/3 p-6 gap-4">
              <p className="font-bold text-lg">Sync Schedule</p>

              <p className="text-sm text-gray-500">
                Choose whether this source syncs only when triggered manually or
                on an automatic schedule.
              </p>

              <div className="flex items-center gap-3">
                <div className="border w-1/2 h-20 rounded-lg">
                  <div className="p-3 flex flex-col">
                    <p className="font-bold ">Manual Sync</p>
                    <p className="text-sm text-gray-500">
                      Run syncs only when you trigger them from the sources page
                    </p>
                  </div>
                </div>
                <div className="border w-1/2 h-20 rounded-lg">
                  <div className="p-3 flex flex-col">
                    <p className="font-bold ">Scheduled sync</p>
                    <p className="text-sm text-gray-500">
                      Set a reccuring cron schedule for automatic data sync
                    </p>
                  </div>
                </div>
              </div>
            </div>
    )
}