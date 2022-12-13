import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import AddProduct from "./component/Admin/AddProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import OrderDetails from "./component/Admin/OrderDetails.js";
import Sidebar from "./component/Admin/Sidebar.js";
import Attributes from "./component/Admin/Attributes.js";
import CreateAttribute from "./component/Admin/CreateAttribute.js";

import "./Admin.css";
import EditAttribute from "./component/Admin/EditAttribute.js";
import Categories from "./component/Admin/Categories.js";
import CreateCategory from "./component/Admin/CreateCategory.js";
import EditCategory from "./component/Admin/EditCategory.js";

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
                  <AddProduct />
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
            <Route
              isAdmin={true}
              exact
              path="/attributes"
              element={
                <ProtectedRoute>
                  <Attributes />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/attributes/new"
              element={
                <ProtectedRoute>
                  <CreateAttribute />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/attribute/:id"
              element={
                <ProtectedRoute>
                  <EditAttribute />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/category/new"
              element={
                <ProtectedRoute>
                  <CreateCategory />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              exact
              path="/category/:id"
              element={
                <ProtectedRoute>
                  <EditCategory />
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
