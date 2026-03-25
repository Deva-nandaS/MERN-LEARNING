import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoAlbumsOutline } from "react-icons/io5";
import { LuGitCompareArrows } from "react-icons/lu";
import { LuDatabaseZap } from "react-icons/lu";
import { BsHddStack } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { LuLayoutList } from "react-icons/lu";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { LuFolderCog } from "react-icons/lu";
import { PiLightningDuotone } from "react-icons/pi";
import { LuFolderClock } from "react-icons/lu";
import { LuMessageSquareDashed } from "react-icons/lu";
import { LuChartNetwork } from "react-icons/lu";
import { LuLibraryBig } from "react-icons/lu";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

export const Sidebar = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [subMenu, setSubMenu] = useState(null);

  return (
    <div className="h-screen flex flex-col  w-72 bg-white">
      {/* Top section */}
      <div className="border-b flex items-center justify-between p-6">
        <img
          className="w-14 h-14 bg-gray-400 rounded-full"
          src="/FigLogo.png"
          alt="FigLogo"
        />

        <div className="mr-16">
          <p className="font-semibold text-lg">Fig Labs</p>
          <p className="text-md text-gray-500">Enterprise</p>
        </div>
        <div>    <TbLayoutSidebarLeftCollapse size={25} className="text-gray-600"/></div>
      </div>
      {/* notebooks */}
      <div className="flex-1 flex flex-col gap-3 text-lg  font-medium p-4 text-gray-600">
        <p className=" flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
          <IoAlbumsOutline />
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
            <div className="flex items-center gap-2">
              {" "}
              <LuGitCompareArrows />
              <p>Integrations</p>
            </div>

            {openMenu === "integrations" ? (
              <IoChevronDown />
            ) : (
              <IoChevronForward />
            )}
          </div>
          {openMenu === "integrations" && (
            <div className="ml-6">
              <p className=" flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <LuDatabaseZap />
                Data Platforms
              </p>

              <p className=" flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <BsHddStack />
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
            <div className="flex items-center gap-2">
              <LuBrain />
              <p>Knowledge</p>
            </div>

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
                <div className="flex items-center gap-2">
                  {" "}
                  <TbTriangleSquareCircle />
                  <p>Builder</p>
                </div>
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
                <div className="flex items-center gap-2">
                  <LuChartNetwork />
                  <p>Metrics</p>
                </div>
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
              <p className="flex items-center gap-2  hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <LuFolderCog />
                Business Context{" "}
              </p>

              <p className="flex items-center gap-2  hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <LuLibraryBig />
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
            <div className="flex items-center gap-2">
              {" "}
              <LuLayoutList />
              <p>Automations</p>
            </div>

            {openMenu === "automations" ? (
              <IoChevronDown />
            ) : (
              <IoChevronForward />
            )}
          </div>
          {openMenu === "automations" && (
            <div className="ml-6">
              <p className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <LuFolderClock />
                Schedules
              </p>
              <p className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <PiLightningDuotone />
                Agent Detections
              </p>
            </div>
          )}
        </div>
        <div className="border-t flex flex-col  gap-2 pt-4 mt-2">
          {" "}
          <p className=" flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            <span>
              <FaRegEdit />
            </span>
            New Thread
          </p>
          <div>
            <div
              className=" flex gap-2 items-center justify-between hover:bg-gray-100 p-2 rounded-md cursor-pointer"
              onClick={() =>
                setOpenMenu(openMenu === "threads" ? null : "threads")
              }
            >
              <div className="flex gap-2 items-center">
                <span className="w-5 h-5 flex items-center justify-center ">
                  {" "}
                  <IoPaperPlaneOutline />
                </span>
                <p> Threads</p>
              </div>

              {openMenu === "threads" ? (
                <IoChevronDown />
              ) : (
                <IoChevronForward />
              )}
            </div>

            {openMenu === "threads" && (
              <div className="ml-6 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                <p className="flex items-center gap-2">
                  <LuMessageSquareDashed />
                  list out all the{" "}
                </p>
                <p className="flex items-center gap-2">
                  <LuMessageSquareDashed />
                  show some
                </p>
                <p className="flex items-center gap-2">
                  <LuMessageSquareDashed />
                  explore
                </p>
                <p className="flex items-center gap-2">
                  <LuMessageSquareDashed />
                  list out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t p-4 ">
        <div className=" flex  items-center justify-between hover:bg-gray-100 p-2 rounded-md cursor-pointer">
          <div className="flex items-center gap-3">
            <div className=" flex items-center rounded-full w-10 h-10 bg-red-700"></div>
            <div>
              {" "}
              <p className="font-bold">Fig User</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          <IoChevronForward />
        </div>
      </div>
    </div>
  );
};
