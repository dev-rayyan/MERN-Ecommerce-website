import React, { Fragment, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import $ from "jquery";

const LoginSignUp = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();
	const location = useLocation();

	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.user
	);

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(login(loginEmail, loginPassword));
	};

	const registerSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("password", password);
		myForm.set("avatar", avatar);
		dispatch(register(myForm));
	};

	const registerDataChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();

			reader.onload = () => {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	const redirect = location.search ? location.search.split("=")[1] : "/account";

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (isAuthenticated) {
			navigate(redirect);
		}
	}, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

	$('.login').on('click', function(){
		$('.signup').addClass('slide-up')
		$('.login').removeClass('slide-up')
	})
	$('.signup').on('click', function(){
		$('.login').addClass('slide-up')
		$('.signup').removeClass('slide-up')
	})
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="LoginSignUpContainer">
						<div class="form-structor">
							<div class="signup slide-up">
								<h2 class="form-title" id="signup">
									<span>or</span>Sign up
								</h2>
								<form onSubmit={registerSubmit} encType="multipart/form-data">
									<div class="form-holder">
										<div>
											<input
												type="text"
												placeholder="Name"
												required
												name="name"
												className="input"
												value={name}
												onChange={registerDataChange}
											/>
										</div>
										<div>
											<input
												type="email"
												placeholder="Email"
												required
												name="email"
												className="input"
												value={email}
												onChange={registerDataChange}
											/>
										</div>
										<div>
											<input
												type="password"
												placeholder="Password"
												name="password"
												className="input"
												required
												value={password}
												onChange={registerDataChange}
											/>
										</div>
										<div
											className="row input m-0"
											style={{ height: "70px", alignItems: "center" }}
										>
											<input
												type="file"
												name="avatar"
												className="col p-0"
												accept="image/*"
												onChange={registerDataChange}
											/>
											<img
												id="registerImage"
												src={avatarPreview}
												alt="Avatar Preview"
												className="col p-0"
											/>
										</div>
									</div>
									<input type="submit" value="Sign Up" className="submit-btn" />
								</form>
							</div>
							<div class="login">
								<div class="center">
									<h2 class="form-title" id="login">
										<span>or</span>Log in
									</h2>
									<form onSubmit={loginSubmit}>
										<div class="form-holder">
											<input
												type="email"
												placeholder="Email"
												required
												className="input"
												value={loginEmail}
												onChange={(e) => setLoginEmail(e.target.value)}
											/>
											<input
												type="password"
												placeholder="Password"
												required
												className="input"
												value={loginPassword}
												onChange={(e) => setLoginPassword(e.target.value)}
											/>
										</div>
										<input type="submit" value="Login" className="submit-btn" />
									</form>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default LoginSignUp;
