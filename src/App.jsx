// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Products from "./Pages/Products/products";
import Categories from "./Pages/Categories/categories";
import SubCategories from "./Pages/SubCategories/subcategories";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
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
        // {
        //   path: "/orders",
        //   element: <Orders />,
        // },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
