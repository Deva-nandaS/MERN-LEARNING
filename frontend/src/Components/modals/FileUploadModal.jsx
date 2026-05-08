import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { BaseModal } from "../ui/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { uploadFiles } from "../../api/fileupload";

export const FileUploadModal = ({ onClose }) => {
  const [files, setFiles] = useState([]);
  const[isDragging,setIsDragging]=useState(false)

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

  const handleDrop=(e)=>{
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files))
  }

  const handleDragOver=(e)=>{
    e.preventDefault();
    setIsDragging(true);
  }

  const handleDragLeave=()=>{
    setIsDragging(false)
  }

const handleUpload = async () => {
  try {
    const res = await uploadFiles(files, "dev");
    console.log("Uploaded:", res);
    setFiles([]);
    alert("Upload successful!");
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

  return (
    <BaseModal isOpen={true} onClose={onClose} maxWidth="max-w-[900px]">
      <div
        className="bg-white rounded-lg flex flex-col
      w-[95%] max-w-[900px] h-[95vh]
      md:w-[900px] md:h-[500px]"
      >
 <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100 rounded-t-lg shrink-0">
          {/* header */}
          <div className="flex items-center gap-2 ">
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

        {/* body */}
        <div className="flex flex-col p-3 justify-center items-center overflow-y-auto">
          <div onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border border-dashed rounded-lg w-80 h-36 p-3 flex flex-col justify-center items-center mt-5
            ${
              isDragging ? "border-fuchsia-900":
              "border-gray-500 "

            }`} >
            <p className="font-bold">Drag and drop files here</p>
            <p>or</p>
            <label className=" bg-fuchsia-900 p-2 text-white rounded mt-5">
              Browse
              <Input
                type="file"
                multiple
                className="hidden"
                onChange={handleBrowse}
              />
            </label>
          </div>
              

          {/* file list */}
          <div className="flex flex-col flex-1 ">
            {files.length === 0 ? (
              <p className="text-sm mt-3 flex justify-center">
                No files selected yet
              </p>
            ) : (
              <div className="ml-3 mt-3 gap-4">
                <h3 className="mt-3 font-bold">Uploaded files</h3>
                <div className="flex gap-10 flex-wrap">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="relative flex flex-col border border-fuchsia-900 w-fit h-18 rounded mt-3 p-3"
                    >
                      <p>{file.name}</p>
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
              <div className="flex justify-center py-4">
                  <Button className=" bg-fuchsia-900 text-white px-10 py-2 rounded-lg w-64 "
                  onClick={handleUpload}>Upload</Button>
                </div>
          </div>
        </div>
         </div>
      
    </BaseModal>
  );
};
