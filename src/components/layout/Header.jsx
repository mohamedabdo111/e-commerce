import React from "react";
import { Button, Layout } from "antd";

const { Header } = Layout;

const HeaderLayout = ({ colorBgContainer, setCollapsed, collapsed }) => {
  return (
    <Header
      style={{
        textAlign: "right",
        padding: "0 10px",
        background: colorBgContainer,
      }}
    >
      <Button
        type="default"
        size="large"
        // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}

        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",

          width: 64,
        }}
      >
        logout
      </Button>
    </Header>
  );
};

export default HeaderLayout;
