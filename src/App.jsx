// import "./App.css";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const Products = React.lazy(() => import("./Pages/Products/products"));
const SubCategories = React.lazy(() =>
  import("./Pages/SubCategories/subcategories")
);
const Offers = React.lazy(() => import("./Pages/Offers/offers"));
const Sliders = React.lazy(() => import("./Pages/Sliders/sliders"));
const LoginForm = React.lazy(() => import("./auth/login"));
const Categories = React.lazy(() => import("./Pages/Categories/categories"));
const MainLayout = React.lazy(() => import("./components/layout/MainLayout"));
function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" replace />,
      children: [
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/subcategories",
          element: <SubCategories />,
        },
        {
          path: "/offers",
          element: <Offers />,
        },
        {
          path: "/sliders",
          element: <Sliders />,
        },
        // {
        //   path: "/orders",
        //   element: <Orders />,
        // },
      ],
    },
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to="/" replace /> : <LoginForm />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
