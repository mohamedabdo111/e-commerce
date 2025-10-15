import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { ChartBarStacked } from "lucide-react";
import { PackageSearch } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Layers } from "lucide-react";

const { Sider } = Layout;
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Update selected keys based on current route
  useEffect(() => {
    const pathToKeyMap = {
      "/categories": "1",
      "/subcategories": "2",
      "/products": "3",
      "/orders": "4",
    };

    const currentKey = pathToKeyMap[location.pathname];
    if (currentKey) {
      setSelectedKeys([currentKey]);
    }
  }, [location.pathname]);

  const handleNavigate = (key) => {
    setSelectedKeys([key]);
    switch (key) {
      case "1":
        navigate("/categories");
        break;
      case "2":
        navigate("/subcategories");
        break;
      case "3":
        navigate("/products");
        break;
      case "4":
        navigate("/orders");
        break;
    }
  };
  return (
    <Sider
      onClick={() => setCollapsed(!collapsed)}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        onClick={({ key }) => handleNavigate(key)}
        items={[
          {
            key: "1",
            icon: <ChartBarStacked />,
            label: "Categories",
          },
          {
            key: "2",
            icon: <Layers />,
            label: "Sub Categories",
          },
          {
            key: "3",
            icon: <PackageSearch />,
            label: "Products",
          },
          // {
          //   key: "4",
          //   icon: <ShoppingCart />,
          //   label: "Orders",
          // },
        ]}
      />
    </Sider>
  );
};

export default SideBar;
