import "./App.css";
import { useState, useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store.js";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassowrd from "./component/User/ForgotPassowrd.js";
import ResetPassword from "./component/User/ResetPassword.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	const [stripeApiKey, setStripeApiKey] = useState("");

	async function getSripteApiKey() {
		const { data } = await axios.get("/api/v1/stripeapikey");

		setStripeApiKey(data.stripeApiKey);
	}

	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Driod Sans", "Chilanka"],
			},
		});

		store.dispatch(loadUser());

		getSripteApiKey();
	}, []);

	return (
		<Router>
			<Header />
			{isAuthenticated && <UserOptions user={user} />}
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/product/:id" element={<ProductDetails />} />
				<Route exact path="/products" element={<Products />} />
				<Route path="/products/:keyword" element={<Products />} />
				<Route exact path="/search" element={<Search />} />
				<Route
					exact
					path="/account"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/me/update"
					element={
						<ProtectedRoute>
							<UpdateProfile />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/password/update"
					element={
						<ProtectedRoute>
							<UpdatePassword />
						</ProtectedRoute>
					}
				/>
				<Route exact path="/password/forgot" element={<ForgotPassowrd />} />
				<Route
					exact
					path="/password/reset/:token"
					element={<ResetPassword />}
				/>
				<Route exact path="/login" element={<LoginSignUp />} />
				<Route exact path="/cart" element={<Cart />} />
				<Route
					exact
					path="/shipping"
					element={
						<ProtectedRoute>
							<Shipping />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/order/confirm"
					element={
						<ProtectedRoute>
							<ConfirmOrder />
						</ProtectedRoute>
					}
				/>
				{stripeApiKey && (
					<Route
						exact
						path="/process/payment"
						element={
							<Elements stripe={loadStripe(stripeApiKey)}>
								<ProtectedRoute>
									<Payment />
								</ProtectedRoute>
							</Elements>
						}
					/>
				)}
				<Route
					exact
					path="/success"
					element={
						<ProtectedRoute>
							<OrderSuccess />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/orders"
					element={
						<ProtectedRoute>
							<MyOrders />
						</ProtectedRoute>
					}
				/>
				<Route
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
					path="/admin/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					isAdmin={true}
					exact
					path="/admin/products"
					element={
						<ProtectedRoute>
							<ProductList />
						</ProtectedRoute>
					}
				/>
				<Route
					isAdmin={true}
					exact
					path="/admin/product"
					element={
						<ProtectedRoute>
							<NewProduct />
						</ProtectedRoute>
					}
				/>
				<Route
					isAdmin={true}
					exact
					path="/admin/product/:id"
					element={
						<ProtectedRoute>
							<UpdateProduct />
						</ProtectedRoute>
					}
				/>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
