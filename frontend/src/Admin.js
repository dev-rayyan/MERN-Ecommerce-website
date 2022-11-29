import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import OrderDetails from "./component/Admin/OrderDetails.js";
import Sidebar from "./component/Admin/Sidebar.js";
import "./Admin.css";

const admin = () => {
  return (
    <div class="page-wrapper chiller-theme toggled">
      <Sidebar />
      <main class="page-content">
        <div class="container-fluid bg-200">
          <Routes>
            <Route
              isAdmin={true}
              exact
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/product"
              element={
                <ProtectedRoute>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/users"
              element={
                <ProtectedRoute>
                  <UsersList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/user/:id"
              element={
                <ProtectedRoute>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/reviews"
              element={
                <ProtectedRoute>
                  <ProductReviews />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default admin;
