import { BiCalendarAlt } from "react-icons/bi";
import { useRef } from "react";

export const Configure = ({formData = {}, setFormData }) => {
  const dateRef=useRef(null);
  return (
    <div className="flex flex-col w-full gap-4">
      <p className="font-bold text-2xl">Configure Source</p>
      <p className=" text-gray-600 mt-1 text-sm">
        Name your source and enter details.
      </p>
      <div>
        {" "}
        <label className="font-semibold text-sm">Source Name</label>
        <input
        
          value={formData?.sourceName || ""}
          onChange={(e) =>
            setFormData({
              ...FormData,
              sourceName: e.target.value,
            })
          }
          placeholder="e.g.,facebook_mark"
          className="border border-gray-300 p-2.5 rounded-md w-full text-sm outline-none focus:ring-1 focus:ring-gray-400"
        ></input>
      </div>

 
       <div className="flex flex-col gap-1">
         <label className="font-semibold text-sm">Start Date (optional)</label>
 
         <div
           className="flex items-center border border-gray-300 rounded-md px-3 py-2.5 cursor-pointer"
           onClick={() => dateRef.current?.showPicker()}
         >
           <span
             className={`flex-1 text-sm ${
               FormData?.startDate ? "text-gray-800" : "text-gray-400"
             }`}
           >
             {FormData?.startDate || "dd-mm-yyyy"}
           </span>
 
           <BiCalendarAlt className="text-gray-500 text-lg" />
 
           <input
             ref={dateRef}
             type="date"
             value={FormData?.startDate || ""}
             onChange={(e) =>
               setFormData({
                 ...formData,
                 startDate: e.target.value,
               })
             }
             className="w-0 h-0 opacity-0 absolute"
           />
         </div>
 
         <p className="text-xs text-gray-500">
           Earliest date to sync data from. If not set, defaults to 2024-01-01.
         </p>
       </div>


      <div className="flex flex-col gap-1">
         <label className="font-semibold text-sm">End Date (optional)</label>
 
         <div
           className="flex items-center border border-gray-300 rounded-md px-3 py-2.5 cursor-pointer"
           onClick={() => dateRef.current?.showPicker()}
         >
           <span
             className={`flex-1 text-sm ${
               FormData?.startDate ? "text-gray-800" : "text-gray-400"
             }`}
           >
             {FormData?.startDate || "dd-mm-yyyy"}
           </span>
 
           <BiCalendarAlt className="text-gray-500 text-lg" />
 
           <input
             ref={dateRef}
             type="date"
             value={FormData?.startDate || ""}
             onChange={(e) =>
               setFormData({
                 ...formData,
                 startDate: e.target.value,
               })
             }
             className="w-0 h-0 opacity-0 absolute"
           />
         </div>
 

       </div>


    </div>
  );
};
