export const Review=()=>{
    return(
         <div className="flex flex-col w-2/3 p-6 gap-4">
                      <p className="font-bold text-lg">Configuration</p>
        
                      <p className="text-sm text-gray-500">
                        Review your step before creating the source.
                      </p>
                      <div className="flex flex-col border w-[500px] h-[180px] rounded-lg">
                        <div className="flex flex-col p-3 text-gray-600 gap-2 ml-2">
                          <p>Source Name:</p>
                          <p>Authentication:</p>
                          <p>Shopify Store:</p>
                          <p>Sync Schedule:</p>
                          <p>Start Date:</p>
                        </div>
                      </div>
                    </div>
    )
}