import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./i18n";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient();

const savedLang = localStorage.getItem("lang") || "en";
const direction = savedLang === "ar" ? "rtl" : "ltr";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      direction={direction}
      theme={{
        token: {
          colorPrimary: "#203f57",
          colorLink: "#4a90b8",
          borderRadius: 12,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
        components: {
          Menu: {
            darkItemBg: "transparent",
            darkItemSelectedBg: "rgba(74, 144, 184, 0.2)",
            darkItemHoverBg: "rgba(74, 144, 184, 0.1)",
            darkItemSelectedColor: "#5fb3e0",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position={direction === "rtl" ? "bottom-left" : "bottom-right"} />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>
);
