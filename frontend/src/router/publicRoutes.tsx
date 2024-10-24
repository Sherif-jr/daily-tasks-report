import MainLayout from "@/layouts/MainLayout";
// import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";
// import Tasks from "@/pages/Tasks";
import { RouteObject } from "react-router-dom";

const publicRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    // {
    //   index: true,
    //   element: <Dashboard />,
    // },
    {
      index: true,
      element: <Employees />,
    },
    // {
    //   path: "tasks",
    //   element: <Tasks />,
    // },
  ],
};

export default publicRoutes;
