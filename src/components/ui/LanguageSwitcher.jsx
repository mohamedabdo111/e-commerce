import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
    window.location.reload();
  };

  return (
    <Button
      onClick={toggle}
      type="default"
      icon={<Globe size={16} />}
    >
      {i18n.language === "ar" ? "English" : "العربية"}
    </Button>
  );
};

export default LanguageSwitcher;
