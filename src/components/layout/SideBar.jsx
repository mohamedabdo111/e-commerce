import React, { useState, useEffect } from "react";
import { Layout, Menu, Drawer } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChartBarStacked,
  PackageSearch,
  ShoppingCart,
  Layers,
  Percent,
  Image,
  PawPrint,
  LayoutDashboard,
  Menu as MenuIcon,
  X,
} from "lucide-react";

const { Sider } = Layout;

const menuItems = (t) => [
  { key: "0", icon: <LayoutDashboard size={18} />, label: t("sidebar.dashboard") },
  { key: "1", icon: <ChartBarStacked size={18} />, label: t("sidebar.categories") },
  { key: "2", icon: <Layers size={18} />, label: t("sidebar.subCategories") },
  { key: "3", icon: <PackageSearch size={18} />, label: t("sidebar.products") },
  { key: "4", icon: <Percent size={18} />, label: t("sidebar.offers") },
  { key: "5", icon: <Image size={18} />, label: t("sidebar.sliders") },
  { key: "6", icon: <ShoppingCart size={18} />, label: t("sidebar.orders") },
];

const routes = {
  "0": "/",
  "1": "/categories",
  "2": "/subcategories",
  "3": "/products",
  "4": "/offers",
  "5": "/sliders",
  "6": "/orders",
};

const pathToKeyMap = {
  "/": "0",
  "/categories": "1",
  "/subcategories": "2",
  "/products": "3",
  "/offers": "4",
  "/sliders": "5",
  "/orders": "6",
};

const sidebarStyle = {
  background: "linear-gradient(180deg, #203f57 0%, #1a3344 100%)",
};

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const key = pathToKeyMap[location.pathname];
    if (key) setSelectedKeys([key]);
  }, [location.pathname]);

  const handleNavigate = (key) => {
    setSelectedKeys([key]);
    navigate(routes[key]);
    if (isMobile) setMobileOpen(false);
  };

  const logo = (
    <div
      className="flex items-center justify-center gap-2 cursor-pointer"
      style={{ padding: collapsed && !isMobile ? "20px 8px" : "20px 16px" }}
      onClick={() => !isMobile && setCollapsed(!collapsed)}
    >
      <PawPrint size={28} color="#5fb3e0" />
      {(!collapsed || isMobile) && (
        <span style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: "-0.025em" }}>
          {t("common.brandName")}
        </span>
      )}
    </div>
  );

  const divider = (
    <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "0 16px 8px" }} />
  );

  const menu = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      onClick={({ key }) => handleNavigate(key)}
      style={{ background: "transparent", borderInlineEnd: "none" }}
      items={menuItems(t)}
    />
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 rtl:right-4 rtl:left-auto z-50 flex items-center justify-center rounded-lg"
          style={{ width: 40, height: 40, background: "#203f57", color: "#fff" }}
        >
          <MenuIcon size={20} />
        </button>
        <Drawer
          placement={document.documentElement.dir === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          width={260}
          styles={{ body: { padding: 0, ...sidebarStyle }, header: { display: "none" } }}
        >
          <div style={{ ...sidebarStyle, minHeight: "100%" }}>
            <div className="flex items-center justify-between" style={{ padding: "16px" }}>
              <div className="flex items-center gap-2">
                <PawPrint size={24} color="#5fb3e0" />
                <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>
                  {t("common.brandName")}
                </span>
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ color: "rgba(255,255,255,0.6)" }}>
                <X size={20} />
              </button>
            </div>
            {divider}
            {menu}
          </div>
        </Drawer>
      </>
    );
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      style={{ ...sidebarStyle, minHeight: "100vh", overflow: "auto" }}
    >
      {logo}
      {divider}
      {menu}
    </Sider>
  );
};

export default SideBar;
