import { useState, useEffect } from "react";
import { Breadcrumb } from "../Components/Breadcrumb";
import { Button } from "../Components/ui/Button";
import { PlatformsTable } from "../Components/Platforms/PlatformsTable";
import { AddSourceModal } from "../Components/modals/AddSourceModal";
import { DeleteModal } from "../Components/modals/DeleteModal";
import { CgDanger } from "react-icons/cg";
import {getPlatforms, createPlatform,updatePlatform,deletePlatform} from "../api/platforms";

export const Platforms = () => {
  const [sources, setSources] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSource, setSelectedSource] = useState("snowflake");
  const [authType, setAuthType] = useState("password");
  const [errors, setErrors] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInEmail = user?.email ?? "unknown";

  const initialFormData = {
    name: "",
    host: "",
    database: "",
    user: "",
    password: "",
    port: "",
    account: "",
    warehouse: "",
    role: "",
    projectId: "",
    dataset: "",
    location: "",
    serviceAccountJson: "",
    privateKey: "",
    privateKeyPassphrase: "",
    sslCert: "",
    sslKey: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    getPlatforms().then(setSources);
  }, []);

  useEffect(() => {
    setErrors({});
  }, [selectedSource]);

  useEffect(() => {
    setErrors({});
  }, [authType]);

  useEffect(() => {
    document.body.style.overflow =
      showAddModal || showDeleteModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAddModal, showDeleteModal]);

  const validate = () => {
    let err = {};

    if (!formData.name) err.name = "Name is required";

    if (selectedSource === "postgres") {
      if (!formData.host) err.host = "Host required";
      if (!formData.database) err.database = "Database required";
      if (!formData.user) err.user = "User required";
      if (!formData.port) err.port = "Port required";
      if (authType === "password" && !formData.password)
        err.password = "Password required";
      if (authType === "ssl" && !formData.sslCert)
        err.sslCert = "SSL Certificate required";
    }

    if (selectedSource === "snowflake") {
      if (!formData.account) err.account = "Account required";
      if (!formData.user) err.user = "User required";
      if (!formData.database) err.database = "Database required";
      if (!formData.warehouse) err.warehouse = "Warehouse required";
      if (authType === "password" && !formData.password)
        err.password = "Password required";
      if (authType === "privateKey" && !formData.privateKey)
        err.privateKey = "Private key required";
    }

    if (selectedSource === "bigquery") {
      if (!formData.projectId) err.projectId = "Project ID required";
      if (!formData.dataset) err.dataset = "Dataset required";
      if (!formData.serviceAccountJson)
        err.serviceAccountJson = "Service Account JSON required";
    }

    return err;
  };

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleEdit = (item) => {
    setIsEditMode(true);
    setSelectedItem(item);
    setSelectedSource(item.type);
    setAuthType(item.authType || "password");
    setFormData({
      ...initialFormData,
      name: item.name || "",
      host: item.host || "",
      database: item.database || "",
      user: item.user || "",
      password: item.password || "",
      port: item.port || "",
      account: item.account || "",
      warehouse: item.warehouse || "",
      role: item.role || "",
      projectId: item.projectId || "",
      dataset: item.dataset || "",
      location: item.location || "",
      serviceAccountJson: item.serviceAccountJson || "",
      privateKey: item.privateKey || "",
      privateKeyPassphrase: item.privateKeyPassphrase || "",
      sslCert: item.sslCert || "",
      sslKey: item.sslKey || "",
    });
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setErrors({});

    const now = new Date();
    const updatedAt = `${now.toLocaleDateString()} ${now.toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" },
    )}`;


    const authCleanup =
      selectedSource === "postgres"
        ? authType === "password"
          ? {
              privateKey: "",
              privateKeyPassphrase: "",
              sslCert: "",
              
            }
          : { password: "", privateKey: "", privateKeyPassphrase: "" }
        : selectedSource === "snowflake"
          ? authType === "password"
            ? {
                privateKey: "",
                privateKeyPassphrase: "",
                sslCert: "",
               
              }
            : { password: "", sslCert: "", sslKey: "" }
          : selectedSource === "bigquery"
            ? {
                password: "",
                privateKey: "",
                privateKeyPassphrase: "",
                sslCert: "",
                
              }
            : {};

    const payload = {
      ...formData,
      ...authCleanup,
      type: selectedSource,
      authType: selectedSource === "bigquery" ? "private_key" : authType,
      updatedAt, 
      updatedBy: loggedInEmail,
    };

    try {
      if (isEditMode) {
        const res = await updatePlatform(selectedItem._id, payload);
        setSources((prev) =>
          prev.map((item) => (item._id === selectedItem._id ? res.data : item)),
        );
      } else {
        const res = await createPlatform(payload);
        setSources((prev) => [...prev, res.data]);
      }

      setFormData(initialFormData);
      setSelectedSource("snowflake");
      setAuthType("password");
      setShowAddModal(false);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving platform:", error);
    }
  };
  const handleDelete = async () => {
    await deletePlatform(selectedItem._id);
    setSources((prev) => prev.filter((item) => item._id !== selectedItem._id));
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="border-b px-6 py-2 -mt-5">
        <Breadcrumb />
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold">
              Data Source Connections
            </h1>
            <p className="text-gray-500">
              Manage and sync your connected data sources
            </p>
          </div>

          <Button
            onClick={() => {
              setIsEditMode(false);
              setFormData(initialFormData);
              setSelectedSource("snowflake");
              setAuthType("password");
              setErrors({});
              setShowAddModal(true);
            }}
            className="bg-fuchsia-700 rounded px-4 py-2 text-white"
          >
            Add Data Source
          </Button>
        </div>

        <PlatformsTable
          sources={sources}
          onEdit={handleEdit}
          onDelete={(item) => {
            setSelectedItem(item);
            setShowDeleteModal(true);
          }}
        />

        <AddSourceModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          isEditMode={isEditMode}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          authType={authType}
          setAuthType={setAuthType}
          errors={errors}
        />

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          name={selectedItem?.name}
        >
          {/* platforms specific extra content */}
          <div className="flex items-center h-[80px] border bg-gray-100 rounded-md p-3">
            <div className="w-[50px] h-[50px] bg-white rounded-md" />
            <div className="ml-3">
              <div className="font-semibold">{selectedItem?.name}</div>
              <div className="text-gray-500">{selectedItem?.type}</div>
              <div className="text-xs bg-gray-300 w-fit px-2 rounded">
                ID: {selectedItem?._id}
              </div>
            </div>
          </div>

          <div className="text-base">
            <p className="font-semibold">What will happen:</p>
            <div className="text-gray-600 mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <CgDanger /> Permanently remove this data source connection.
              </div>
              <div className="flex items-center gap-2">
                <CgDanger /> Stop all active sync jobs for this source.
              </div>
              <div className="flex items-center gap-2">
                <CgDanger /> Remove all associated sync history.
              </div>
            </div>
          </div>
        </DeleteModal>
      </div>
    </div>
  );
};
