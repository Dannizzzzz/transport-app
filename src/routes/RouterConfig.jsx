import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { adminRoutes, defaultRoutes } from "./routes";

const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const BaseLayouts = lazy(() => import("../layouts/BaseLayouts"));

const RouterConfig = (props) => {
  let routes = [
    {
      path: "/", element: <BaseLayouts />, children: [
        ...adminRoutes,
        { path: "admin", element: <Navigate to="/admin/dashboard" /> },
        { index: true, element: <Navigate to="/admin/dashboard" /> },
        { path: "*", element: <PageNotFound /> },
      ]
    },
    ...defaultRoutes,
    { path: "*", element: <PageNotFound /> },
  ];
  const Routes = () => useRoutes(routes);
  return (
    <BrowserRouter>
      <Suspense fallback={<>loading...</>}>
        {routes.length > 0 && <Routes />}
      </Suspense>
    </BrowserRouter>
  );
};
export default RouterConfig;