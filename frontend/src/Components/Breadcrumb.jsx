import { useLocation, useNavigate } from "react-router-dom";

export const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    "/dashboard": "Home",
    "/dashboard/notebooks": "Notebooks",
    "/dashboard/integrations": "Integrations",
    "/dashboard/integrations/platforms": "Data Source Management",
    "/dashboard/integrations/sources": "Sources",
  };

  const currentPage = routeMap[location.pathname] || "Page";

  return (
    <div className=" flex items-center gap-2 text-base pb-2">
      <span
        className="text-gray-500 cursor-pointer hover:text-black"
        onClick={() => navigate("/dashboard")}
      >
        FIG
      </span>

      <span className="text-gray-400">/</span>

      <span className="font-semibold text-gray-900">
        {currentPage}
      </span>
    </div>
  );
};