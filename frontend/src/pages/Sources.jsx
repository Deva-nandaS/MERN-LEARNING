import { Breadcrumb } from "../Components/Breadcrumb";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { ShopifyModal } from "../Components/modals/ShopifyModal";
import { Button } from "../Components/Button";


export const Sources = () => {
  const [selectedSource, setSelectedSource] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const[activeModal,setActiveModal]=useState(null);
  const [activeTab, setActiveTab] = useState("add"); 

  return (
    <div>
      {/* Breadcrumb */}
    <div className="border-b px-4 sm:px-6 py-2 -mt-5">
        <Breadcrumb />
      </div>

    <div className="p-4 sm:p-6 sm:ml-10 flex flex-col">

        {/* UPDATED: Tabs with active state styling */}
      <div className="flex border rounded-lg h-12 bg-white w-fit">
  <Button
    text="Add New Source"
    onClick={() => setActiveTab("add")}
    className={`px-6 py-2 font-bold text-sm uppercase rounded-l-lg ${
      activeTab === "add" ? "bg-black text-white" : "bg-white text-black"
    }`}
  />
  <Button
    text="Sources"
    onClick={() => setActiveTab("sources")}
    className={`px-6 py-2 font-bold text-sm uppercase rounded-r-lg ${
      activeTab === "sources" ? "bg-black text-white" : "bg-white text-black"
    }`}
  />
</div>

        {/* UPDATED: Only show when activeTab is "add" */}
        {activeTab === "add" && (
          <>
            <div className="mt-10 border rounded-lg w-full sm:w-[1000px] h-7 bg-white p-7">
              <div className="flex items-center text-lg gap-3 text-gray-500">
                <CiSearch size={20} />
                <span>Search Connectors...</span>
              </div>
            </div>

            <p className="mt-6 text-lg text-slate-700">13 connectors</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <img src="/facebook.png" alt="fb" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">Facebook Marketing</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <img src="/files.png" alt="files" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">File Upload</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <img src="/googleads.png" alt="googleads" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">Google Ads</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <img src="/sheets.png" alt="sheets" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">Google Sheets</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <img src="/analytics.png" alt="analytics" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">Google Analytics 4</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <img src="/linkedin.png" alt="linkedin" className="w-6 h-6 sm:w-8 sm:h-8"/>
                  <p className="text-xs sm:text-base">LinkedIn Ads</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2">
                  <img src="/hubspot.png" alt="hubspot" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">HubSpot</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6 cursor-pointer" onClick={() => setActiveModal("shopify")}>
                <div className="flex items-center gap-2">
                  <img src="/shopify.png" alt="shopify" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">Shopify</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2 grayscale opacity-50">
                  <img src="/salesforce.png" alt="salesforce" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">Salesforce</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2 grayscale opacity-50">
                  <img src="/clickHouse.png" alt="clickhouse" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">ClickHouse</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2 opacity-50 grayscale">
                  <img src="/Stripe.png" alt="stripe" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">Stripe</p>
                </div>
              </div>

              <div className="flex-1 bg-white border rounded-lg p-6">
                <div className="flex items-center gap-2 opacity-50 grayscale">
                  <img src="/mysql.png" alt="mysql" className="w-6 h-6 sm:w-8 sm:h-8"></img>
                  <p className="text-xs sm:text-base">MySQL</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* UPDATED: Show when activeTab is "sources" */}
        {activeTab === "sources" && (
          <div className="mt-10 text-gray-500 text-base">
            No sources connected yet.
          </div>
        )}

        {activeModal === "shopify" &&
          <ShopifyModal onClose={() => setActiveModal(null)} />}
      </div>
    </div>
  );
};