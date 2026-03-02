import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import HeaderLayout from "./Header";
import SideBar from "./SideBar";

const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout>
        <HeaderLayout colorBgContainer={colorBgContainer} />
        <Content
          style={{
            margin: "16px 12px",
            padding: "16px",
            minHeight: "calc(100vh - 96px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="sm:!m-[24px_16px] sm:!p-6"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
