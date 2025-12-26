import UserLayout from "@/layouts/UserLayout";
import AdminAuthLayout from "@admin/layouts/AdminAuthLayout";
import AdminMainLayout from "@admin/layouts/AdminMainLayout";

import Home from "@/pages/Home";
import ProductPage from "@/pages/ProductPage";
import LoginPage from "@/pages/loginlogout/LogInPage";
import SignupPage from "@/pages/loginlogout/SignupPage";
import CartCheckout from "@/pages/CartCheckout";
import MyOrders from "@/pages/MyOrders";
import SearchedPage from "@/pages/SearchedPage";
import AccountPage from "@/pages/AccountPage";
import ProtectedRoute from "../data/ProtectedRoute";

// Admin pages
import Login from "@admin/pages/auth/Login";
import Logout from "@admin/pages/auth/Logout";
import Products from "@admin/pages/product/Products";
import Customers from "@admin/pages/customer/Customers";
import Sales from "@admin/pages/sale/Sales";

import { Route, Routes, Navigate, Outlet } from "react-router-dom";

/* ================= ADMIN GUARD ================= */

function AdminProtectedRoute() {
  const isAdmin =
    sessionStorage.getItem("adminSession") === "true";

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/admindashboard/login" replace />
  );
}

/* ================= ROUTES ================= */

export default function AllRoute() {
  return (
    <Routes>
      {/* USER ROUTES */}
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="ProductPage" element={<ProductPage />} />
        <Route path="LoginPage" element={<LoginPage />} />
        <Route path="SignupPage" element={<SignupPage />} />
        <Route path="SearchedPage" element={<SearchedPage />} />
        <Route path="myorders" element={<MyOrders />} />

        <Route
          path="CartCheckout"
          element={
            <ProtectedRoute>
              <CartCheckout />
            </ProtectedRoute>
          }
        />

        <Route
          path="account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ADMIN AUTH (NO SIDEBAR) */}
      <Route path="admindashboard" element={<AdminAuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Route>

      {/* ADMIN MAIN (PROTECTED + SIDEBAR) */}
      <Route path="admindashboard" element={<AdminProtectedRoute />}>
        <Route element={<AdminMainLayout />}>
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="sales" element={<Sales />} />
        </Route>
      </Route>
    </Routes>
  );
}
