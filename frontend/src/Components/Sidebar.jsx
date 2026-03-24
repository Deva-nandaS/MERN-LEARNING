import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";

export const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [subMenu, setSubMenu] = useState(null);

  return (
    <div className="h-screen flex flex-col gap-4 w-72 bg-white">
      {/* Top section */}
      <div className="border-b flex items-center justify-between p-6">
        <img
          className="w-14 h-14 bg-gray-400 rounded-full"
          src="/FigLogo.png"
          alt="FigLogo"
        />
        <div className="mr-20">
          <p className="font-semibold text-base">Fig Labs</p>
          <p className="text-md text-gray-500">Enterprise</p>
        </div>
      </div>
      {/* notebooks */}
      <div className="flex flex-col gap-3 text-lg  font-medium p-4 text-gray-600">
        <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
          Notebooks
        </p>
        {/* integrations */}
        <div>
          <div
            className="justify-between flex items-center  hover:bg-gray-100 p-2 rounded-md cursor-pointer"
            onClick={() =>
              setOpenMenu(openMenu === "integrations" ? null : "integrations")
            }
          >
            <p>Integrations</p>
            {openMenu === "integrations" ? (
              <IoChevronDown />
            ) : (
              <IoChevronForward />
            )}
          </div>
          {openMenu === "integrations" && (
            <div className="ml-6">
              <p className=" hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                Data Platforms
              </p>
              <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                Sources
              </p>
            </div>
          )}
        </div>
        {/* knowledge */}
        <div>
          <div
            className="justify-between flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer"
            onClick={() =>
              setOpenMenu(openMenu === "knowledge" ? null : "knowledge")
            }
          >
            <p>Knowledge</p>
            {openMenu === "knowledge" ? (
              <IoChevronDown />
            ) : (
              <IoChevronForward />
            )}
          </div>

          {openMenu === "knowledge" && (
            <div className="ml-6">
              {/* builder */}
              <div
                className=" flex items-center justify-between  hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                onClick={() =>
                  setSubMenu(subMenu === "Builder" ? null : "Builder")
                }
              >
                {" "}
                <p>Builder</p>
                {subMenu === "Builder" ? (
                  <IoChevronDown />
                ) : (
                  <IoChevronForward />
                )}
              </div>
              {subMenu === "Builder" && (
                <div className="ml-6">
                  <p className=" hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                    Option1
                  </p>
                  <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                    Option2
                  </p>
                </div>
              )}

              {/* metrics */}
              <div
                className=" flex items-center justify-between  hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                onClick={() =>
                  setSubMenu(subMenu === "Metrics" ? null : "Metrics")
                }
              >
                {" "}
                <p>Metrics</p>
                {subMenu === "Metrics" ? (
                  <IoChevronDown />
                ) : (
                  <IoChevronForward />
                )}
              </div>
              {subMenu === "Metrics" && (
                <div className="ml-6">
                  <p className=" hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                    Option1
                  </p>
                  <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                    Option2
                  </p>
                </div>
              )}
              <p className=" hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                Business Context{" "}
              </p>
              <p className=" hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                Prompts
              </p>
            </div>
          )}
        </div>

        <div>
          <div
            className="justify-between flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer"
            onClick={() =>
              setOpenMenu(openMenu === "automations" ? null : "automations")
            }
          >
            <p>Automations</p>
            {openMenu === "automations" ? (
              <IoChevronDown />
            ) : (
              <IoChevronForward />
            )}
          </div>
          {openMenu === "automations" && (
            <div className="ml-6">
              <p className=" hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                Schedules
              </p>
              <p className=" hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                Agent Detections
              </p>
            </div>
          )}
        </div>
        <div className="border-t flex flex-col  gap-2 pt-4 mt-2">
          {" "}
          <p className=" flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            <FaRegEdit />
            New Thread
          </p>
          <div>
            <div
              className="justify-between flex items-center  hover:bg-gray-100 p-2 rounded-md cursor-pointer"
              onClick={() =>
                setOpenMenu(openMenu === "threads" ? null : "threads")
              }
            >
              <p className=" flex gap-2 items-center hover:bg-gray-100  rounded-md cursor-pointer">
                <IoPaperPlaneOutline />
                Threads
              </p>

              {openMenu === "threads" ? (
                <IoChevronDown />
              ) : (
                <IoChevronForward />
              )}
            </div>
            {openMenu === "threads" && (
              <div className="ml-6">
                <p className=" hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                  list out all the{" "}
                </p>
                <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                  show some
                </p>
                <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                  explore
                </p>
                <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                  list out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
