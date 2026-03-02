import React from "react";
import { Button, Layout } from "antd";
import { LogOut, PawPrint } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const { Header } = Layout;

const HeaderLayout = ({ colorBgContainer }) => {
  const { t } = useTranslation();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        height: 64,
        lineHeight: "64px",
      }}
    >
      <div className="hidden md:flex items-center gap-2.5">
        <PawPrint size={22} color="#203f57" />
        <span style={{ fontWeight: 700, fontSize: 18, color: "#203f57" }}>
          {t("common.brandName")}
        </span>
      </div>
      <div className="md:hidden" style={{ width: 40 }} />
      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        <Button
          type="text"
          icon={<LogOut size={16} />}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          style={{ color: "#ef4444" }}
          className="hidden sm:inline-flex"
        >
          {t("buttons.logout")}
        </Button>
        <Button
          type="text"
          icon={<LogOut size={16} />}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          style={{ color: "#ef4444" }}
          className="sm:hidden"
        />
      </div>
    </Header>
  );
};

export default HeaderLayout;
