import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Button, Layout, theme } from "antd";
import HeaderLayout from "./Header";
import SideBar from "./SideBar";
const { Header, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <SideBar />
      <Layout>
        <HeaderLayout
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
