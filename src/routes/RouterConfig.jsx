import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { adminRoutes, defaultRoutes } from "./routes";
import Auth from "./Auth";

const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const BaseLayouts = lazy(() => import("../layouts/BaseLayouts"));

const RouterConfig = (props) => {
  let routes = [
    {
      path: "/", element: <BaseLayouts />, children: [
        ...adminRoutes,
        { path: "admin", element: <Navigate to="/admin/dashboard" /> },
        { index: true, element: <Navigate to="/admin/dashboard" /> },
        { path: "admin/*", element: <PageNotFound /> }, /* 在基础布局中404 */
      ]
    },
    ...defaultRoutes,
    { path: "*", element: <PageNotFound /> }, /* 在空白页中404 */
  ];
  const Routes = () => useRoutes(routes);
  return (
    <BrowserRouter>
      <Auth>
        <Suspense fallback={<>loading...</>}>
          {routes.length > 0 && <Routes />}
        </Suspense>
      </Auth>
    </BrowserRouter>
  );
};
export default RouterConfig;