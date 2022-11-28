import { Outlet, useNavigate } from "react-router-dom";
import "./index.less";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import { useState } from "react";
import { adminRoutes } from "../../routes/routes";
import logo from '../../assets/img/logo.jpeg';
const { Header, Content, Sider, Footer } = Layout;

// 成一条菜单项的结构
function getItem({ label, key, icon, children, disabled }) {
  if (!disabled) {
    return {
      key, // 对应path
      icon,
      children,
      label,
      disabled,
    };
  }
}
const getRoutes = (arr) =>
  arr.map(({ label, path, icon, disabled, children }) =>
    getItem({ label, key: path, icon, disabled, children: children && getRoutes(children) })
  );
// 菜单中的所有数据
let items = getRoutes(adminRoutes);
// 生成根部菜单的keys数据 - 第一层
const rootSubmenuKeys = items.filter((item) => typeof item !== "undefined").map((item) => item.key);

const BaseLayouts = (props) => {
  // 控制Sider打开/关闭状态
  const [collapsed, setCollapsed] = useState(false);
  const [marginLeft, setMarginLeft] = useState(210);
  // 当前展开的SubMenu菜单项 key 数组
  const [openKeys, setOpenKeys] = useState([]);
  // 初始选中的菜单项 key 数组
  const [defaultSelectedKeys] = useState([items[0].key]);
  // 编程式跳转
  let navigate = useNavigate();
  // SubMenu展开/关闭的回调
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  // 点击SubMenu跳转到相应页面
  const getPathName = (key) => {
    return adminRoutes.filter((item) => item.path === key)
  };
  const [selectName, setSelectName] = useState("");
  const onMenuSelect = ({ key, keyPath }) => {
    setSelectName(getPathName(key)[0].label);
    navigate("/" + keyPath.reverse().join("/"));
  };
  return (
    <Layout style={{ paddingTop: 74 }}>
      {/* 头部 */}
      <Header className="header" style={{ position: "fixed", zIndex: 1, width: "100%", top: 0 }}>
        <Row>
          <Col flex={10}><img className="logo" src={logo} alt="logo" /></Col>
          <Col><span style={{ color: "#fff" }}>用户姓名</span></Col>
        </Row>
      </Header>
      {/* 主体 */}
      <Layout style={{ marginLeft }}>
        {/* 侧边栏 */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => {
            collapsed ? setMarginLeft(80 + 10) : setMarginLeft(200 + 10);
            setCollapsed(collapsed);
          }}
          width={200}
          collapsedWidth={80}
          breakpoint="md"
          className="site-layout-background"
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 74
          }}
        >
          <Menu
            defaultSelectedKeys={defaultSelectedKeys}
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
            onSelect={onMenuSelect}
          />
        </Sider>
        {/* 内容 */}
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          {/* 面包屑组件 - 告知当前所在位置 */}
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
            separator=""
          >
            <Breadcrumb.Item>当前所在位置</Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item href="/admin/dashboard"><HomeOutlined /> 主页</Breadcrumb.Item>
            {(selectName !== "主页" && window.location.pathname.split('/').pop() !== 'dashboard') ? (<><Breadcrumb.Separator /><Breadcrumb.Item >{selectName}</Breadcrumb.Item></>) : null}
          </Breadcrumb>
          {/* 主体内容 */}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet></Outlet>
          </Content>
          {/* 尾部 */}
          <Footer style={{ fontSize: 12, color: 'grey', textAlign: 'center' }}>&copy; 2022 ChinaScope Limited All Rights Reserved 沪ICP备11039653号-7</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default BaseLayouts;