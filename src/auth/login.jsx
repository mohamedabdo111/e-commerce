import React, { useState } from "react";
import { User, Lock, LogIn, Eye, EyeOff, PawPrint } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "") {
      toast.error(t("toasts.pleaseEnterUsername"));
      return;
    }
    if (password === "") {
      toast.error(t("toasts.pleaseEnterPassword"));
      return;
    }
    setLoading(true);

    try {
      if (
        username === import.meta.env.VITE_EMAIL &&
        password === import.meta.env.VITE_PASSWORD
      ) {
        toast.success(t("toasts.loginSuccess"));
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/";
      } else {
        toast.error(t("toasts.invalidCredentials"));
      }
    } catch (error) {
      toast.error(t("toasts.somethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)" }}>
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 shadow-sm"
              style={{ background: "linear-gradient(135deg, #203f57 0%, #4a90b8 100%)" }}
            >
              <PawPrint className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-semibold mb-2" style={{ color: "#203f57" }}>
              {t("login.welcomeBack")}
            </h1>
            <p className="text-gray-600">{t("login.signInSubtitle")}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-2" style={{ color: "#203f57" }}>
                {t("login.username")}
              </label>
              <div className="relative">
                <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("login.enterUsername")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  className="w-full pl-11 rtl:pl-4 rtl:pr-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ "--tw-ring-color": "#203f57" }}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2" style={{ color: "#203f57" }}>
                {t("login.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login.enterPassword")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  className="w-full pl-11 rtl:pl-12 rtl:pr-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ "--tw-ring-color": "#203f57" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded"
                  style={{ accentColor: "#203f57" }}
                />
                <span className="ml-2 rtl:mr-2 rtl:ml-0 text-gray-600 text-sm">{t("login.rememberMe")}</span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-12 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #203f57 0%, #4a90b8 100%)" }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t("login.signingIn")}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{t("login.signIn")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
