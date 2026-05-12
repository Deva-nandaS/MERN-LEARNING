import { BaseModal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { IoCloseSharp } from "react-icons/io5";
import { LuTriangleAlert } from "react-icons/lu";

export const DeleteModal = ({ isOpen, onClose, onConfirm, name, children }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="w-[500px] bg-white rounded shadow-lg flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100 rounded-t-lg">
          <h2 className="text-xl font-bold">Delete Data Source</h2>
          <button
            onClick={onClose}
            className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col gap-4">
          <p className="text-gray-700 text-base">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-600">{name}</span>?
          </p>

          {/* extra content from parent */}
          {children}

          {/* Alert */}
          <div className="bg-red-100 border border-red-300 p-3 rounded flex items-center gap-2 text-red-600 font-bold text-sm">
            <LuTriangleAlert />
            This action cannot be undone
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-2">
            <Button
              onClick={onClose}
              className="border rounded-md font-semibold bg-gray-100 text-black w-1/2 py-3 text-lg"
            >
              Cancel
            </Button>
            
            <Button
              onClick={onConfirm}
              className="bg-red-600 text-white rounded-md font-bold w-1/2 py-3 text-lg"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
