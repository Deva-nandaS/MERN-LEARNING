import { useState } from "react";
import { FaPlug } from "react-icons/fa";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

export const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSub, setOpenSub] = useState(false);

  return (
    <div className="p-4">

      {/* Integrations */}
      <div>
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md"
        >
          <div className="flex gap-3 items-center">
            <FaPlug className="text-gray-500" />
            <p>Integrations</p>
          </div>

          {openMenu ? <IoChevronDown /> : <IoChevronForward />}
        </div>

        {/* First dropdown */}
        {openMenu && (
          <div className="ml-6">

            {/* Sub dropdown */}
            <div
              onClick={() => setOpenSub(!openSub)}
              className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md"
            >
              <p>API</p>
              {openSub ? <IoChevronDown size={14}/> : <IoChevronForward size={14}/>}
            </div>

            {/* Nested dropdown */}
            {openSub && (
              <div className="ml-6 text-sm text-gray-600">
                <p className="p-1 hover:bg-gray-100 rounded">REST</p>
                <p className="p-1 hover:bg-gray-100 rounded">GraphQL</p>
              </div>
            )}

            <p className="p-2 hover:bg-gray-100 rounded-md">Webhooks</p>
          </div>
        )}
      </div>

    </div>
  );
};