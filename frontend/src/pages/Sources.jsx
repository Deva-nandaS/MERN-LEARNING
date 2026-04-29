import { Breadcrumb } from "../Components/Breadcrumb";
import { CiSearch } from "react-icons/ci";
import { ShopifyModal } from "../Components/modals/ShopifyModal";
import { Button } from "../Components/Button";
import { useEffect, useState } from "react";

export const Sources = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState("add");
  const [search, setSearch] = useState("");
const [sources, setSources] = useState([]);
const [loading, setLoading] = useState(false);
useEffect(() => {
  const fetchSources = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/shopify");
      const data = await res.json();

      setSources(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (activeTab === "sources") {
    fetchSources();
  }
}, [activeTab]);

  //  CONNECTORS DATA
  const connectors = [
      { name: "Shopify", img: "/shopify.png", modal: "shopify" },
    { name: "Facebook Marketing", img: "/facebook.png" },
    { name: "File Upload", img: "/files.png" },
    { name: "Google Ads", img: "/googleads.png" },
    { name: "Google Sheets", img: "/sheets.png" },
    { name: "Google Analytics 4", img: "/analytics.png" },
    { name: "LinkedIn Ads", img: "/linkedin.png" },
    { name: "HubSpot", img: "/hubspot.png" },
    { name: "Salesforce", img: "/salesforce.png", disabled: true },
    { name: "ClickHouse", img: "/clickHouse.png", disabled: true },
    { name: "Stripe", img: "/Stripe.png", disabled: true },
    { name: "MySQL", img: "/mysql.png", disabled: true },
  ];

  // filter
  const filteredConnectors = connectors.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b px-4 sm:px-6 py-2 -mt-5">
        <Breadcrumb />
      </div>

      <div className="p-4 sm:p-6 sm:ml-10 flex flex-col">
        {/* Tabs */}
        <div className="flex border rounded-lg h-12 bg-white w-fit">
          <Button
            text="Add New Source"
            onClick={() => setActiveTab("add")}
            className={`px-6 py-2 font-bold text-sm uppercase rounded-l-lg ${
              activeTab === "add"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          />
          <Button
            text="Sources"
            onClick={() => setActiveTab("sources")}
            className={`px-6 py-2 font-bold text-sm uppercase rounded-r-lg ${
              activeTab === "sources"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          />
        </div>

        {activeTab === "add" && (
          <>
            {/* Search bar */}
            <div className="mt-10 border rounded-lg w-full h-3 sm:w-[1000px] bg-white p-7">
              <div className="flex items-center text-lg gap-3 text-gray-500 -mt-3">
                <CiSearch size={20} />
                <input
                  type="text"
                  placeholder="Search Connectors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className=" w-full text-lg bg-transparent outline-none"
                />
              </div>
            </div>

            <p className="mt-6 text-lg text-slate-700">
              {filteredConnectors.length} connectors
            </p>

            {/* grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
              {filteredConnectors.map((item, index) => (
                <div
                  key={index}
                  onClick={() => item.modal && setActiveModal(item.modal)}
                  className={`flex-1 bg-white border rounded-lg p-6 ${
                    item.modal ? "cursor-pointer" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      item.disabled ? "grayscale opacity-50" : ""
                    }`}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                    <p className="text-xs sm:text-base">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

     {activeTab === "sources" && (
  <div className="mt-7 border rounded-lg overflow-hidden bg-white">
    
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">

        {/* HEADER */}
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
          <tr>
            <th className="p-4 border">Source Name</th>
            <th className="p-4 border">Authentication</th>
            <th className="p-4 border">Sync Schedule</th>
            <th className="p-4 border">Start Date</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center p-6">
                Loading...
              </td>
            </tr>
          ) : sources.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-6 text-gray-500">
                No sources found
              </td>
            </tr>
          ) : (
            sources.map((item) => (
              <tr key={item._id} className="border-t">

                <td className="p-4 border">{item.sourceName}</td>

                <td className="p-4 border">{item.method}</td>


                <td className="p-4 border">
                  {item.syncType === "scheduled"
                    ? item.cron || "Scheduled"
                    : "Manual"}
                </td>

                <td className="p-4 border">
                  {item.startDate
                    ? new Date(item.startDate).toLocaleDateString()
                    : "-"}
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  </div>
)}

        {/* MODAL */}
        {activeModal === "shopify" && (
          <ShopifyModal onClose={() => setActiveModal(null)} />
        )}
      </div>
    </div>
  );
};
