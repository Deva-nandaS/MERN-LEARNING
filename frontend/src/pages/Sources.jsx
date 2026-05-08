import { Breadcrumb } from "../Components/Breadcrumb";
import { CiSearch } from "react-icons/ci";
import { ShopifyModal } from "../Components/modals/ShopifyModal";
import { Button } from "../Components/ui/Button";
import { useEffect, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { DeleteModal } from "../Components/modals/DeleteModal";
import { getSources, deleteSource } from "../api/shopify";
import { FileUploadModal } from "../Components/modals/FileUploadModal";

export const Sources = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState("add");
  const [search, setSearch] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const [formData, setFormData] = useState({
    _id: "",
    sourceName: "",
    method: "",
    token: "",
    storeUrl: "",
    startDate: "",
    syncType: "manual",
    cron: "",
  });
  useEffect(() => {
    const fetchSources = async () => {
      try {
        setLoading(true);
        const data = await getSources();
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

  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        _id: editData._id,
        sourceName: editData.sourceName || "",
        method: editData.method || "",
        token: editData.token || "",
        storeUrl: editData.storeUrl || "",
        startDate: editData.startDate || "",
        syncType: editData.syncType || "manual",
        cron: editData.cron || "",
      });
    }
  }, [isEditMode, editData]);

  const connectors = [
    { name: "Shopify", img: "/shopify.png", modal: "shopify" },
    { name: "File Upload", img: "/files.png", modal: "files" },
    { name: "Facebook Marketing", img: "/facebook.png" },
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

  const filteredConnectors = connectors.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="border-b px-4 sm:px-6 py-2 -mt-5">
        <Breadcrumb />
      </div>

      <div className="p-4 sm:p-6 sm:ml-10 flex flex-col">
        <div className="flex border rounded-lg h-12 bg-white w-fit">
          <Button
            onClick={() => {
              setActiveTab("add");
              setIsEditMode(false);
              setEditData(null);
              setFormData({
                sourceName: "",
                method: "",
                token: "",
                storeUrl: "",
                startDate: "",
                syncType: "manual",
                cron: "",
              });
            }}
            className={`px-6 py-2 font-bold text-sm uppercase rounded-l-lg ${
              activeTab === "add"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}>
              Add New Source
          </Button>

          <Button
        
            onClick={() => setActiveTab("sources")}
            className={`px-6 py-2 font-bold text-sm uppercase rounded-r-lg ${
              activeTab === "sources"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
        >
              Sources
        </Button>
        </div>

        {activeTab === "add" && (
          <>
            <div className="mt-10 border rounded-lg w-full sm:w-[1000px] bg-white px-4 py-3 flex items-center gap-3 text-gray-500">
              <CiSearch size={20} />
              <input
                type="text"
                placeholder="Search Connectors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-lg bg-transparent outline-none"
              />
            </div>

            <p className="mt-6 text-lg text-slate-700">
              {filteredConnectors.length} connectors
            </p>

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
                    className={`flex items-center gap-2 ${item.disabled ? "grayscale opacity-50" : ""}`}
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
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                  <tr>
                    <th className="p-4 border">Source Name</th>
                    <th className="p-4 border">Authentication</th>
                    <th className="p-4 border">Sync Schedule</th>
                    <th className="p-4 border">Start Date</th>
                    <th className="p-4 border">Actions</th>
                  </tr>
                </thead>
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
                            ?  "Scheduled"
                            : "Manual"}
                        </td>
                        <td className="p-4 border">
                          {item.startDate
                            ? new Date(item.startDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="p-4 border">
                          <div className="flex gap-4 items-center">
                            <LuRefreshCcw
                              className="cursor-pointer text-gray-500"
                              onClick={() => console.log("refresh", item._id)}
                            />
                            <FaRegEdit
                              className="cursor-pointer"
                              onClick={() => {
                                setIsEditMode(true);
                                setEditData(item);
                                setActiveModal("shopify");
                              }}
                            />
                            <FaRegTrashAlt
                              className="text-red-600 cursor-pointer"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowDeleteModal(true);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeModal === "shopify" && (
          <ShopifyModal
            onClose={() => {
              setActiveModal(null);
              setIsEditMode(false);
              setEditData(null);
              setActiveTab("sources");
            }}
            isEditMode={isEditMode}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {activeModal === "files" && <FileUploadModal  onClose={()=>setActiveModal(null)}/>}

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          name={selectedItem?.sourceName}
          onConfirm={async () => {
            if (!selectedItem?._id) return;
            try {
              await deleteSource(selectedItem._id);
              setSources((prev) =>
                prev.filter((item) => item._id !== selectedItem._id),
              );
              setShowDeleteModal(false);
              setSelectedItem(null);
            } catch (err) {
              console.error("Delete error:", err);
              alert("Failed to delete source");
            }
          }}
        />
      </div>
    </div>
  );
};
