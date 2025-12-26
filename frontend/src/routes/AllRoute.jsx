import { Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
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
import Admins from "@admin/pages/admin/Admins";
import Sales from "@admin/pages/sale/Sales";
import AddProduct from "@admin/pages/product/AddProduct";
import EditProduct from "@admin/pages/product/EditProduct";
import AddCustomer from "@admin/pages/customer/AddCustomer";
import EditCustomer from "@admin/pages/customer/EditCustomer";
import AddAdmin from "@admin/pages/admin/AddAdmin";
import EditAdmin from "@admin/pages/admin/EditAdmin";
import ProductDetail from "@admin/pages/product/ProductDetail";
import CustomerDetail from "@admin/pages/customer/CustomerDetail";
import AdminDetail from "@admin/pages/admin/AdminDetail";

export default function AllRoute() {
  return (
    <Routes>

      {/* USER */}
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

      {/* ADMIN MAIN (WITH SIDEBAR) */}
      <Route path="admindashboard" element={<AdminMainLayout />}>
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product" element={<EditProduct />} />
        <Route path="product-detail" element={<ProductDetail />} />

        <Route path="customers" element={<Customers />} />
        <Route path="add-customer" element={<AddCustomer />} />
        <Route path="edit-customer" element={<EditCustomer />} />
        <Route path="customer-detail" element={<CustomerDetail />} />

        <Route path="admins" element={<Admins />} />
        <Route path="add-admin" element={<AddAdmin />} />
        <Route path="edit-admin" element={<EditAdmin />} />
        <Route path="admin-detail" element={<AdminDetail />} />

        <Route path="sales" element={<Sales />} />
      </Route>

    </Routes>
  );
}
