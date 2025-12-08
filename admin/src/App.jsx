import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Products from './pages/product/Products';
import Customers from './pages/customer/Customers';
import Admins from './pages/admin/Admins';
import Sales from './pages/sale/Sales';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';
import AddCustomer from './pages/customer/AddCustomer';
import EditCustomer from './pages/customer/EditCustomer';
import AddAdmin from './pages/admin/AddAdmin';
import EditAdmin from './pages/admin/EditAdmin';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import ProductDetail from './pages/product/ProductDetail';
import CustomerDetail from './pages/customer/CustomerDetail';
import AdminDetail from './pages/admin/AdminDetail';


function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product" element={<EditProduct />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/edit-customer" element={<EditCustomer />} />
            <Route path="/customer-detail" element={<CustomerDetail />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/add-admin" element={<AddAdmin />} />
            <Route path="/edit-admin" element={<EditAdmin />} />
            <Route path="/admin-detail" element={<AdminDetail />} />
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
