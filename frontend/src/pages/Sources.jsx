import { Breadcrumb } from "../Components/Breadcrumb";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
export const Sources = () => {
  const [selectedSource, setSelectedSource] = useState("false");
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b px-6 py-2 -mt-5">
        <Breadcrumb />
      </div>

      {/* addnewsource box */}
      <div className=" p-6 ml-10 flex flex-col ">
        <div className="flex flex-col border rounded-lg h-12 w-72 bg-white  ">
          <div className="flex items-center gap-9 p-3 uppercase font-bold">
            <span>Add New Source</span>
            <span>Sources</span>
          </div>
        </div>
        <div className="mt-10 border rounded-lg w-[1000px] h-7 bg-white p-7 ">
          <div className=" flex items-center text-lg gap-3 text-gray-500">
            <CiSearch size={20} />
            <span className="">Search Connectors...</span>
          </div>
        </div>
        <p className="mt-6 text-lg text-slate-700">13 connectors</p>
        <div className="grid grid-cols-3 gap-3 mt-5  ">
          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>Facebook Marketing</p>
          </div>

            <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>File Uploads</p>
          </div>
            <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>Google Ads</p>
          </div>


           <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>Google Analytics 4</p>
          </div>

            <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>Google Sheets</p>
          </div>
            <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>LinkedIn Ads</p>
          </div>


           <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>HubSpot</p>
          </div>

            <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>Shopify</p>
          </div>
            <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>Salesforce</p>
          </div>

             <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>ClickHouse</p>
          </div>

            <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>Stripe</p>
          </div>
            <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <p>MySQL</p>
          </div>
        </div>
      </div>
    </div>
  );
};
