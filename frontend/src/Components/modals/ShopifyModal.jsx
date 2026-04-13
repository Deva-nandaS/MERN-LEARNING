import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../Button";


export const ShopifyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-0 flex items-start md:items-center justify-center pt-16 md:pt-0 overflow-y-auto z-50">
      <div
        className="bg-white rounded-lg w-[800px] h-[500px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
          <div className="flex items-center gap-2">
            <img src="/shopify.png" alt="shopify" className="w-10 h-10"></img>
            <h2 className="text-xl font-bold">Set up Shopify</h2>
          </div>

          <IoCloseSharp className="bg-red-400 rounded-md" onClick={onClose} />
        </div>
        {/* BODY */}
        <div className="flex flex-1">
          {/* left */}
          <div className="w-1/3 border-r p-3  bg-gray-100">
            <div className="flex gap-3 ">
              <div className="flex flex-col items-center">
                <div className="flex bg-fuchsia-900 rounded-full text-white font-bold text-lg i w-10 h-10 items-center justify-center">
                  1
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                {" "}
                <p className="font-semibold">Connect</p>
                <p className="text-sm text-gray-600">Authentication</p>
              </div>
            </div>

            {/* second */}
            <div className="flex gap-3 mt-4">
              <div className="flex flex-col items-center">
                <div className="flex bg-fuchsia-900 rounded-full text-white font-bold text-lg i w-10 h-10 items-center justify-center">
                  2
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                <p className="font-semibold">Configure</p>
                <p className="text-sm text-gray-600">Store Details</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <div className="flex flex-col items-center">
                <div className="flex bg-fuchsia-900 rounded-full text-white font-bold text-lg i w-10 h-10 px-4 py-2 items-center justify-center">
                  3
                </div>
                <div className="bg-gray-300 w-px h-12"></div>
              </div>
              <div>
                <p className="font-semibold">Sync Schedule</p>
                <p className="text-sm text-gray-600">Manual or automated</p>
              </div>
            </div>
          </div>
          {/* RIGHT */}

          <div className="flex flex-col w-2/3 p-4 gap-4">
            {" "}
            <p className="font-bold text-lg">Connect Your Account</p>
            <p className="text-sm text-gray-300">
              Choose how you want to authenticate with Shopify
            </p>
            <p className="text-sm text-gray-500 ">Authentication Method</p>
            <div className="flex gap-4 mt-3  ">
              <div className="w-1/2 rounded border p-4 ">
              <div className="p-4">
              <p className="font-bold">OAuth 2.0</p>
              <p className="text-sm">Connect your Shopify store via OAuth(coming soon)</p>
              </div>
              </div>
               <div className="w-1/2 rounded border p-4 bg-gray-100 ">
               <p className="font-bold">Access Token</p>
               <p className="text-gray-600">Enter your Shopify Private App acces token manually</p>
               </div>
            </div>
          </div>
        </div>
         <div className="flex border-t justify-end px-3 py-3  bg-gray-100">
          <div className="flex gap-2 ">
            <Button
                    className="bg-gray-200 border rounded-md font-semibold w-32 py-2 "
                    text="Cancel"
                    
                  />
                     <Button
                    className="bg-black text-white border rounded-md font-semibold w-32 py-2 "
                    text="Next"
                    
                  />
          </div>

          
        </div>
      </div>
    </div>
  );
};
