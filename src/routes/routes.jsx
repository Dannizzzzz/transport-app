import { lazy } from "react";
import { HomeOutlined, TransactionOutlined, SoundOutlined, ProfileOutlined, CarOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";

const Login = lazy(() => import("../pages/Login"));
const DashBoard = lazy(() => import("../pages/admin/DashBoard"));
const Notices = lazy(() => import("../pages/admin/Notices"));
const WayBillList = lazy(() => import("../pages/admin/waybill/WayBillList"));
const WayBillEdit = lazy(() => import("../pages/admin/waybill/WayBillEdit"));
const VehiclesList = lazy(() => import("../pages/admin/vehicles/VehiclesList"));
const VehiclesEdit = lazy(() => import("../pages/admin/vehicles/VehiclesEdit"));
const FundsList = lazy(() => import("../pages/admin/funds/FundsList"));
const FundsEdit = lazy(() => import("../pages/admin/funds/FundsEdit"));
const StaffList = lazy(() => import("../pages/admin/staff/StaffList"));
const StaffEdit = lazy(() => import("../pages/admin/staff/StaffEdit"));
const Settings = lazy(() => import("../pages/admin/Settings"));

// 1. 默认路由
let defaultRoutes = [{ path: "/login", element: <Login /> }];

// 2. 管理员路由数据
let adminRoutes = [
  {
    path: "admin/dashboard",
    element: <DashBoard />,
    disabled: false,
    icon: <HomeOutlined />,
    label: "主页",
  },
  {
    path: "admin/notices",
    element: <Notices />,
    disabled: true,
    icon: <SoundOutlined />,
    label: "通知中心",
  },
  /* 运单管理 */
  {
    path: "admin/waybill-list",
    element: <WayBillList />,
    disabled: false,
    icon: <ProfileOutlined />,
    label: "运单管理",
  },
  {
    path: "admin/waybill-edit",
    element: <WayBillEdit />,
    disabled: true,
    icon: <ProfileOutlined />,
    label: "运单新增",
    children: [
      {
        path: ":id",
        element: <WayBillEdit />,
        disabled: true,
        icon: <ProfileOutlined />,
        label: "运单编辑",
      },
      {
        index: true,
        element: <WayBillEdit />,
        disabled: true,
        icon: <ProfileOutlined />,
        label: "运单新增",
      }
    ],
  },
  /* 车辆管理 */
  {
    path: "admin/vehicles-list",
    element: <VehiclesList />,
    disabled: false,
    icon: <CarOutlined />,
    label: "车辆管理",
  },
  {
    path: "admin/vehicles-edit",
    element: <VehiclesEdit />,
    disabled: true,
    icon: <CarOutlined />,
    label: "车辆新增",
    children: [
      {
        path: ":id",
        element: <VehiclesEdit />,
        disabled: true,
        icon: <CarOutlined />,
        label: "车辆编辑",
      },
      {
        index: true,
        element: <VehiclesEdit />,
        disabled: true,
        icon: <CarOutlined />,
        label: "车辆新增",
      }
    ],
  },
  /* 经费管理 */
  {
    path: "admin/funds-list",
    element: <FundsList />,
    disabled: false,
    icon: <TransactionOutlined />,
    label: "运单管理",
  },
  {
    path: "admin/funds-edit",
    element: <FundsEdit />,
    disabled: true,
    icon: <TransactionOutlined />,
    label: "经费新增",
    children: [
      {
        path: ":id",
        element: <FundsEdit />,
        disabled: true,
        icon: <TransactionOutlined />,
        label: "经费编辑",
      },
      {
        index: true,
        element: <FundsEdit />,
        disabled: true,
        icon: <TransactionOutlined />,
        label: "经费新增",
      }
    ],
  },
  /* 员工信息 */
  {
    path: "admin/staff-list",
    element: <StaffList />,
    disabled: false,
    icon: <TeamOutlined />,
    label: "员工列表",
  },
  {
    path: "admin/staff-edit",
    element: <StaffEdit />,
    disabled: true,
    icon: <TeamOutlined />,
    label: "员工新增",
    children: [
      {
        path: ":id",
        element: <StaffEdit />,
        disabled: true,
        icon: <TeamOutlined />,
        label: "员工编辑",
      },
      {
        index: true,
        element: <StaffEdit />,
        disabled: true,
        icon: <TeamOutlined />,
        label: "员工新增",
      }
    ],
  },
  /* 系统设置 */
  {
    path: "admin/settings",
    element: <Settings />,
    disabled: false,
    icon: <SettingOutlined />,
    label: "系统设置",
  },
];

// 3. 用户路由数据
let userRoutes = [];

export { defaultRoutes, adminRoutes, userRoutes };