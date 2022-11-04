import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
const ProtectedRoute = ({ isAdmin, children }) => {
	const { loading, isAuthenticated, user } = useSelector((state) => state.user);
	if (loading !== true) {
		if (isAuthenticated === false) {
			return <Navigate to="/login" />;
		}

		if (isAdmin === true && user.role !== "admin") {
			return <Navigate to="/login" />;
		}
	}
	return <Fragment>{loading === false ? children : null}</Fragment>;
};

export default ProtectedRoute;
