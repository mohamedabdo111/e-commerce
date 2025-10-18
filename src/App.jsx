// import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Products from "./Pages/Products/products";
import Categories from "./Pages/Categories/categories";
import SubCategories from "./Pages/SubCategories/subcategories";
import Offers from "./Pages/Offers/offers";
import Sliders from "./Pages/Sliders/sliders";
import LoginForm from "./auth/login";

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
