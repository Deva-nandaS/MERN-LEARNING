import { IoCloseSharp } from "react-icons/io5";
import { CgDanger } from "react-icons/cg";
import { LuTriangleAlert } from "react-icons/lu";
import { Button } from "../ui/Button";
import { BaseModal } from "../ui/Modal";

export const DeleteSourceModal = ({ isOpen, onClose, selectedItem, onDelete }) => (
  <BaseModal isOpen={isOpen} onClose={onClose}>
    <div className="bg-white w-[500px] rounded shadow-lg flex flex-col">
      <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
        <h2 className="text-2xl font-bold">Delete Data Source</h2>
        <button onClick={onClose} className="p-2 bg-red-700 text-white rounded">
          <IoCloseSharp />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center h-[80px] border bg-gray-100 rounded-md p-3">
          <div className="w-[50px] h-[50px] bg-white rounded-md" />
          <div className="ml-3">
            <div className="font-semibold">{selectedItem?.name}</div>
            <div className="text-gray-500">{selectedItem?.type}</div>
            <div className="text-xs bg-gray-300 w-fit px-2 rounded">
              ID: {selectedItem?.id}
            </div>
          </div>
        </div>

        <div className="mt-4 text-base">
          <p className="font-semibold">What will happen:</p>
          <div className="text-gray-600 mt-2 space-y-2">
            <div className="flex items-center gap-2"><CgDanger /> Permanently remove this data source connection.</div>
            <div className="flex items-center gap-2"><CgDanger /> Stop all active sync jobs for this source.</div>
            <div className="flex items-center gap-2"><CgDanger /> Remove all associated sync history.</div>
          </div>
        </div>

        <div className="mt-4 bg-red-100 border border-red-300 p-3 rounded flex items-center gap-2 text-red-600 font-bold">
          <LuTriangleAlert /> This action cannot be undone
        </div>

        <div className="flex justify-center gap-4 mt-6 px-6">
          <Button
            text="Cancel"
            onClick={onClose}
            className="border rounded-md font-semibold bg-gray-100 text-black w-1/2 text-lg"
          />
          <Button
            text="Delete Data Source"
            className="bg-red-600 text-white rounded-md font-bold w-1/2 py-3 text-lg"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  </BaseModal>
);