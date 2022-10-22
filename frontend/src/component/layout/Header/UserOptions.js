import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { Dashboard, ListAlt, ExitToApp, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction.js";
import { useDispatch } from "react-redux";
import { Backdrop } from "@material-ui/core";

const UserOptions = ({ user }) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const alert = useAlert();
	const dispatch = useDispatch();

	const options = [
		{ icon: <ListAlt />, name: "Orders", func: orders },
		{ icon: <Person />, name: "Profile", func: account },
		{ icon: <ExitToApp />, name: "Logout", func: logoutUser },
	];

	if (user.role === "admin") {
		options.unshift({
			icon: <Dashboard />,
			name: "Dashboard",
			func: dashboard,
		});
	}

	function dashboard() {
		navigate("/dashboard");
	}

	function orders() {
		navigate("/orders");
	}

	function account() {
		navigate("/account");
	}

	function logoutUser() {
		dispatch(logout());
		alert.success("Logout Successfully");
	}
	return (
		<Fragment>
			<Backdrop open={open} style={{ zIndex: "10" }} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				direction="down"
				className="speedDial"
				icon={
					<img
						className="speedDialIcon"
						src={user.avatar.url ? user.avatar.url : "/Profile.png"}
						alt="Profile"
					/>
				}
			>
				{options.map((item) => (
					<SpeedDialAction
						key={item.name}
						icon={item.icon}
						tooltipTitle={item.name}
						onClick={item.func}
					/>
				))}
			</SpeedDial>
		</Fragment>
	);
};

export default UserOptions;
