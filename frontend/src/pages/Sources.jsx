import { Breadcrumb } from "../Components/Breadcrumb";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { ShopifyModal } from "../Components/modals/ShopifyModal";


export const Sources = () => {
  const [selectedSource, setSelectedSource] = useState("false");
  const [selectedItem, setSelectedItem] = useState(null);
  const[activeModal,setActiveModal]=useState(null);

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
            <div className="flex items-center gap-2  ">
              {" "}
              <img src="/facebook.png" alt="fb" className=" w-8 h-8"></img>{" "}
              <p>Facebook Marketing</p>
            </div>
          </div>

          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <div className="flex items-center gap-2  ">
              {" "}
              <img src="/files.png" alt="files" className=" w-8 h-8"></img>{" "}
              <p>File Upload</p>
            </div>
          </div>
          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <div className="flex items-center gap-2 ">
              {" "}
              <img src="/googleads.png" alt="googleads" className=" w-8 h-8"></img>{" "}
              <p>Google Ads</p>
            </div>
          </div>

          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <div className="flex items-center gap-2  ">
              {" "}
              <img src="/sheets.png" alt="sheets" className=" w-8 h-8"></img>{" "}
              <p>Google Sheets</p>
            </div>
          </div>

          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <div className="flex items-center gap-2  ">
              {" "}
              <img src="/analytics.png" alt="analytics" className=" w-8 h-8"></img>{" "}
              <p>Google Analytics 4</p>
            </div>
          </div>
          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <div className="flex items-center gap-2  ">
              {" "}
              <img src="/linkedin.png" alt="linkedin" className=" w-8 h-8"/>{" "}
                 <p>LinkedIn Ads</p>
            </div>
         
          </div>

          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <div className="flex items-center gap-2 ">
              {" "}
              <img src="/hubspot.png" alt="hubspot" className=" w-8 h-8"></img>{" "}
              <p>HubSpot</p>
            </div>{" "}
          </div>

          <div className="flex-1 bg-white border rounded-lg p-6  cursor-pointer " onClick={()=>setActiveModal("shopify")}>
            {" "}
            <div className="flex items-center gap-2">
              {" "}
              <img src="/shopify.png" alt="shopify" className=" w-8 h-8"></img>{" "}
              <p>Shopify</p>
            </div>
          </div>

          
          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <div className="flex items-center gap-2 grayscale opacity-50 ">
              {" "}
              <img src="/salesforce.png" alt="salesforce" className=" w-8 h-8"></img>{" "}
              <p>Salesforce</p>
            </div>
          </div>

          <div className="flex-1 bg-white border rounded-lg p-6 ">
            {" "}
            <div className="flex items-center gap-2 grayscale opacity-50 ">
              {" "}
              <img src="/clickHouse.png" alt="clickhouse" className=" w-8 h-8"></img>{" "}
              <p>ClickHouse</p>
            </div>
          </div>

          <div className="flex-1 bg-white border rounded-lg p-6  ">
            {" "}
            <div className="flex items-center gap-2 gray-scale opacity-50 ">
              {" "}
              <img src="/Stripe.png" alt="stripe" className=" w-8 h-8"></img>{" "}
              <p>Stripe</p>
            </div>
          </div>
          <div className="flex-1 bg-white border rounded-lg p-6   ">
            {" "}
            <div className="flex items-center gap-2 opacity-50 gray-scale">
              {" "}
              <img src="/mysql.png" alt="mysql" className=" w-8 h-8 "></img>{" "}
              <p>MySQL</p>
            </div>
          </div>
        </div>
             {activeModal=== "shopify"&&
         <ShopifyModal onClose={()=>setActiveModal(null)} />}
      </div>
    </div>
  );
};
