import { Button } from "../ui/Button";
import { useEffect, useState, useRef } from "react";
import { Input } from "../ui/Input";
import { BaseModal } from "../ui/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { uploadFiles } from "../../api/fileupload";
import { FaCheck } from "react-icons/fa";
import { FormError } from "../ui/FormError";

export const FileUploadModal = ({
  onClose,
  formData,
  setFormData,
  onUploadSuccess,
  isEditMode,
}) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");
  const [uploadedData, setUploadedData] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEditMode && formData?.fileName) {
      setFiles([
        {
          id: Date.now(),
          name: formData.fileName,
          size: "",
        },
      ]);
    }
  }, [isEditMode, formData]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const addFiles = (newFiles) => {
    const mapped = newFiles.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + "KB",
      file,
    }));
    setFiles((prev) => {
      const existing = prev.map((f) => f.name);
      const filtered = mapped.filter((f) => !existing.includes(f.name));
      return [...prev, ...filtered];
    });
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleBrowse = (e) => {
    addFiles(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async () => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const invalidTypes = files.filter(
      (f) => f.file && !allowedTypes.includes(f.file.type),
    );

    if (invalidTypes.length > 0) {
      setError(
        `Invalid file type: ${invalidTypes.map((f) => f.name).join(", ")}. Only CSV and Excel allowed.`,
      );
      return;
    }

    if (!formData?.sourceName?.trim()) {
      setError("name");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await uploadFiles(files, user?.email, formData.sourceName);
      setFiles([]);
      setUploaded(true);
      setError("");
      setUploadedData({
        _id: res.data?.[0]?._id || Date.now(),
        sourceName: formData.sourceName,
        authType: "Nil",
        syncType: "Nil",
        startDate: "Nil",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed. Try again.");
    }
  };

  return (
    <BaseModal isOpen={true} onClose={onClose} maxWidth="max-w-[900px]">
      <div className="bg-white rounded-lg flex flex-col w-[95%] max-w-[900px] h-[95vh] md:w-[900px] md:h-[500px]">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100 rounded-t-lg shrink-0">
          <div className="flex items-center gap-2">
            <img src="/files.png" alt="files" className="w-10 h-10" />
            <h2 className="text-xl font-bold">Set up File Upload</h2>
          </div>
          <Button
            onClick={onClose}
            className="bg-red-700 p-2 text-white rounded hover:bg-red-800"
          >
            <IoCloseSharp />
          </Button>
        </div>

        {/* BODY */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {uploaded ? (
            // SUCCESS SCREEN
            <div className="flex flex-col items-center justify-center flex-1 h-full gap-4">
              <div className="text-green-600">
                <FaCheck size={50} />
              </div>
              <h2 className="text-xl font-semibold">
                File Uploaded Successfully!
              </h2>
              <p className="text-gray-500">{formData?.sourceName}</p>
            </div>
          ) : (
            // UPLOAD FORM
            <div className="flex flex-col p-3 flex-1 overflow-y-auto">
              <div className="font-bold text-lg">
                <p>Upload your files.</p>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-sm mt-3">File name</label>
                <input
                  value={formData?.sourceName || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, sourceName: e.target.value });
                    if (error === "name") setError("");
                  }}
                  placeholder="Enter file name"
                  className={`border p-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-gray-400 ${
                    error === "name" ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error === "name" && (
                  <FormError message="Please enter a file name." />
                )}
              </div>

              <div className="flex justify-center">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border border-dashed bg-fuchsia-100 rounded-lg w-96 h-52 p-3 flex flex-col justify-center items-center mt-5 ${
                    isDragging ? "border-fuchsia-900" : "border-gray-500"
                  }`}
                >
                  <img src="/files.png" alt="files" className="w-5 h-7" />
                  <p className="font-bold">Drag and drop files here</p>
                  <p>or</p>
                  <label className="bg-fuchsia-900 p-2 text-white rounded mt-5">
                    Browse
                    <Input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleBrowse}
                    />
                  </label>
                  <p className="text-gray-600 text-sm mt-3">
                    Supported formats: CSV, Excel files only.
                  </p>
                </div>
              </div>

              {/* FILE LIST */}
              <div className="w-full mt-4">
                {files.length === 0 ? (
                  <p className="text-sm mt-3 flex justify-center">
                    No files selected yet
                  </p>
                ) : (
                  <div className="mt-3">
                    <h3 className="mt-3 font-bold">Selected files</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="relative flex flex-col border border-fuchsia-900 w-fit rounded p-3"
                        >
                          <p className="text-sm">{file.name}</p>
                          <p className="text-xs text-gray-400">{file.size}</p>
                          <div
                            className="bg-red-600 text-white rounded-full cursor-pointer absolute -top-2 -right-2"
                            onClick={() => removeFile(file.id)}
                          >
                            <IoCloseSharp />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FOOTER */}
          {/* FOOTER */}
          <div className="flex flex-col border-t bg-gray-100 rounded-b-lg shrink-0">
            {error && error !== "name" && (
              <div className="px-4 pt-2">
                <FormError message={error} />
              </div>
            )}
            <div className="flex justify-center px-4 py-3">
              {uploaded ? (
                <Button
                  className="bg-black text-white rounded-md font-semibold w-32 py-2"
                  onClick={() => {
                    if (onUploadSuccess && uploadedData) {
                      onUploadSuccess(uploadedData); // ← called on Done click
                    }
                    onClose();
                  }}
                >
                  Done
                </Button>
              ) : (
                files.length > 0 && (
                  <Button
                    className="bg-fuchsia-900 text-white rounded-md font-semibold w-32 py-2"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
