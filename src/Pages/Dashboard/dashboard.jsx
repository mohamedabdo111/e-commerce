import React from "react";
import { Card, Statistic } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ChartBarStacked,
  PackageSearch,
  ShoppingCart,
  Layers,
  Percent,
  Image,
  PawPrint,
} from "lucide-react";
import { getAllCategories } from "../../api/categories";
import { getAllProducts } from "../../api/products";
import { getAllSubCategories } from "../../api/subCategory";
import { getAllOffers } from "../../api/offers";
import { getAllSliders } from "../../api/slider";
import { getAllOrders } from "../../api/orders";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: categories } = useQuery({
    queryKey: ["dashboard-categories"],
    queryFn: () => getAllCategories(1, 1),
  });
  const { data: subCategories } = useQuery({
    queryKey: ["dashboard-subCategories"],
    queryFn: () => getAllSubCategories(1, 1),
  });
  const { data: products } = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: () => getAllProducts(1, 1),
  });
  const { data: offers } = useQuery({
    queryKey: ["dashboard-offers"],
    queryFn: () => getAllOffers(1, 1),
  });
  const { data: sliders } = useQuery({
    queryKey: ["dashboard-sliders"],
    queryFn: () => getAllSliders(1, 1),
  });
  const { data: orders } = useQuery({
    queryKey: ["dashboard-orders"],
    queryFn: () => getAllOrders(1, 1),
  });

  const stats = [
    {
      title: t("sidebar.categories"),
      count: categories?.pagination?.total ?? "—",
      icon: <ChartBarStacked size={28} />,
      color: "#203f57",
      path: "/categories",
    },
    {
      title: t("sidebar.subCategories"),
      count: subCategories?.pagination?.total ?? "—",
      icon: <Layers size={28} />,
      color: "#2d5a7b",
      path: "/subcategories",
    },
    {
      title: t("sidebar.products"),
      count: products?.pagination?.total ?? "—",
      icon: <PackageSearch size={28} />,
      color: "#4a90b8",
      path: "/products",
    },
    {
      title: t("sidebar.offers"),
      count: offers?.pagination?.total ?? "—",
      icon: <Percent size={28} />,
      color: "#f59e0b",
      path: "/offers",
    },
    {
      title: t("sidebar.sliders"),
      count: sliders?.pagination?.total ?? "—",
      icon: <Image size={28} />,
      color: "#5fb3e0",
      path: "/sliders",
    },
    {
      title: t("sidebar.orders"),
      count: orders?.pagination?.total ?? "—",
      icon: <ShoppingCart size={28} />,
      color: "#10b981",
      path: "/orders",
    },
  ];

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <PawPrint size={28} className="sm:w-8 sm:h-8 shrink-0" color="#203f57" />
          <h1 className="text-xl sm:text-3xl font-bold" style={{ color: "#203f57" }}>
            {t("common.welcomeMessage")}
          </h1>
        </div>
        <p className="text-gray-500 text-sm sm:text-base">{t("common.dashboardSubtitle")}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {stats.map((stat) => (
          <Card
            key={stat.path}
            hoverable
            onClick={() => navigate(stat.path)}
            style={{ borderRadius: 16, cursor: "pointer" }}
            styles={{ body: { padding: "16px" } }}
            className="sm:[&_.ant-card-body]:!p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <Statistic title={stat.title} value={stat.count} />
              <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  background: `${stat.color}14`,
                  color: stat.color,
                }}
              >
                {React.cloneElement(stat.icon, { size: 22 })}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
