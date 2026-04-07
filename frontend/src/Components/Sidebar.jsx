import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IoPaperPlaneOutline, IoAlbumsOutline } from "react-icons/io5";
import {
  LuGitCompareArrows,
  LuDatabaseZap,
  LuBrain,
  LuLayoutList,
} from "react-icons/lu";
import { BsHddStack } from "react-icons/bs";
import {
  TbTriangleSquareCircle,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import {
  LuFolderCog,
  LuFolderClock,
  LuMessageSquareDashed,
  LuChartNetwork,
  LuLibraryBig,
} from "react-icons/lu";
import { PiLightningDuotone } from "react-icons/pi";

export const Sidebar = ({ user, onUserClick }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [subMenu, setSubMenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const itemStyle = `flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
    isCollapsed ? "justify-center" : "gap-2"
  }`;

  return (
    <div
      className={`h-screen flex flex-col bg-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"}`}
    >
      {/* Top */}
      <div
        className={`border-b flex items-center ${isCollapsed ? "justify-center" : "justify-between"} p-4`}
      >
        <div className="items-center gap-2 flex">
          <img
            onClick={() => isCollapsed && setIsCollapsed(false)}
            className={`cursor-pointer ${
              isCollapsed ? "w-8 h-8" : "w-12 h-12"
            } object-contain`}
            src="/FigLogo.png"
            alt="logo"
          />

          {!isCollapsed && (
            <div>
              <p className="font-semibold">Fig Labs</p>
              <p className="text-sm text-gray-500">Enterprise</p>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <TbLayoutSidebarLeftCollapse
            size={22}
            className="cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 p-3 text-gray-600 text-sm font-medium flex flex-col gap-2">
        {/* Notebooks */}
        <div
          onClick={() => navigate("/dashboard/notebooks")}
          className={itemStyle}
        >
          <IoAlbumsOutline size={20} />
          {!isCollapsed && <span>Notebooks</span>}
        </div>

        {/* Integrations */}
        <div>
          <div
            className={`${itemStyle} justify-between`}
            onClick={() =>
              !isCollapsed &&
              setOpenMenu(openMenu === "integrations" ? null : "integrations")
            }
          >
            <div
              onClick={() => navigate("/dashboard/integrations")}
              className="flex items-center gap-2"
            >
              <LuGitCompareArrows size={20} />
              {!isCollapsed && <span>Integrations</span>}
            </div>

            {!isCollapsed &&
              (openMenu === "integrations" ? (
                <IoChevronDown />
              ) : (
                <IoChevronForward />
              ))}
          </div>

          {openMenu === "integrations" && !isCollapsed && (
            <div className="ml-6">
              <div
                onClick={() => navigate("/dashboard/integrations/platforms")}
                className={itemStyle}
              >
                <LuDatabaseZap />
                <span>Data Platforms</span>
              </div>
              <div
                onClick={() => navigate("/dashboard/integrations/sources")}
                className={itemStyle}
              >
                <BsHddStack />
                <span>Sources</span>
              </div>
            </div>
          )}
        </div>

        {/* Knowledge */}
        <div>
          <div
            className={`${itemStyle} justify-between`}
            onClick={() =>
              !isCollapsed &&
              setOpenMenu(openMenu === "knowledge" ? null : "knowledge")
            }
          >
            <div className="flex items-center gap-2">
              <LuBrain size={20} />
              {!isCollapsed && <span>Knowledge</span>}
            </div>

            {!isCollapsed &&
              (openMenu === "knowledge" ? (
                <IoChevronDown />
              ) : (
                <IoChevronForward />
              ))}
          </div>

          {openMenu === "knowledge" && !isCollapsed && (
            <div className="ml-6">
              {/* Builder */}
              <div
                className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                onClick={() => {
                  setSubMenu(subMenu === "Builder" ? null : "Builder");
                  navigate("/dashboard/knowledge/builder");
                }}
              >
                <div className="flex items-center gap-2">
                  <TbTriangleSquareCircle />
                  <span>Builder</span>
                </div>
                {subMenu === "Builder" ? (
                  <IoChevronDown />
                ) : (
                  <IoChevronForward />
                )}
              </div>

              {/* Metrics */}
              <div
                className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                onClick={() => {
                  setSubMenu(subMenu === "Metrics" ? null : "Metrics");
                  navigate("/dashboard/knowledge/metrics");
                }}
              >
                <div className="flex items-center gap-2">
                  <LuChartNetwork />
                  <span>Metrics</span>
                </div>
                {subMenu === "Metrics" ? (
                  <IoChevronDown />
                ) : (
                  <IoChevronForward />
                )}
              </div>

              <div
                onClick={() => navigate("/dashboard/knowledge/businesscontext")}
                className={itemStyle}
              >
                <LuFolderCog />
                <span>Business Context</span>
              </div>

              <div
                onClick={() => navigate("/dashboard/knowledge/prompts")}
                className={itemStyle}
              >
                <LuLibraryBig />
                <span>Prompts</span>
              </div>
            </div>
          )}
        </div>

        {/* Automations */}
        <div>
         <div className={`${itemStyle} justify-between`}
            onClick={() =>
              !isCollapsed &&
              setOpenMenu(openMenu === "automations" ? null : "automations")
            }
          >
            <div className="flex items-center gap-2">
              <LuLayoutList size={20} />
              {!isCollapsed && <span>Automations</span>}
            </div>

            {!isCollapsed &&
              (openMenu === "automations" ? (
                <IoChevronDown />
              ) : (
                <IoChevronForward />
              ))}
          </div>

          {openMenu === "automations" && !isCollapsed && (
            <div className="ml-6">
              <div
                onClick={() => navigate("/dashboard/automations/schedules")}
                className={itemStyle}
              >
                <LuFolderClock />
                <span>Schedules</span>
              </div>
              <div
                onClick={() =>
                  navigate("/dashboard/automations/agentdetections")
                }
                className={itemStyle}
              >
                <PiLightningDuotone />
                <span>Agent Detections</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="border-t mt-2 pt-2">
          <div
            onClick={() => navigate("/dashboard/newthread")}
            className={itemStyle}
          >
            <FaRegEdit size={20} />
            {!isCollapsed && <span>New Thread</span>}
          </div>

          <div className={`${itemStyle} justify-between`}
            
            onClick={() =>
              !isCollapsed &&
              setOpenMenu(openMenu === "threads" ? null : "threads")
            }
          >
         <div className="flex items-center gap-2" >
              <IoPaperPlaneOutline size={20} />
              {!isCollapsed && <span>Threads</span>}
            </div>

            {!isCollapsed &&
              (openMenu === "threads" ? (
                <IoChevronDown />
              ) : (
                <IoChevronForward />
              ))}
          </div>

          {openMenu === "threads" && !isCollapsed && (
            <div className="ml-8">
              <div className={itemStyle}>
                <LuMessageSquareDashed /> List
              </div>
              <div className={itemStyle}>
                <LuMessageSquareDashed /> Explore
              </div>
            </div>
          )}
        </div>
      </div>
      {/* User */}
      <div className="border-t p-2 md:p-3">
        <div
          onClick={onUserClick}
          className={`flex items-center rounded-md cursor-pointer hover:bg-gray-100 transition-all
      ${isCollapsed ? "justify-center p-2" : "gap-3 p-2"}
    `}
        >
          {/* Avatar */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm md:text-base">
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <p className="font-semibold text-sm truncate">Fig User</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}

          {/* Arrow */}
          {!isCollapsed && (
            <IoChevronForward className="ml-auto text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};
