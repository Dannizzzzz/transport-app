import { Outlet } from "react-router-dom";
import "./index.less";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { useState } from "react";
const { Header, Content, Sider, Footer } = Layout;

const BaseLayouts = (props) => {
  const items = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
  const [collapsed, setCollapsed] = useState(false);
  const [marginLeft, setMarginLeft] = useState(210);

  return (
    <Layout style={{ paddingTop: 74 }}>
      <Header className="header" style={{ position: "fixed", zIndex: 1, width: "100%", top: 0 }}>
        <div className="logo"></div>
      </Header>
      <Layout style={{ marginLeft }}>
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
          }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
          <Footer>footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default BaseLayouts;