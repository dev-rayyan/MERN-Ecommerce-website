import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => state.products);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProduct());
	}, [dispatch, error, alert]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title="Ecommerce" />

					<div className="banner">
						<p>Welcome to Ecommerce</p>
						<div class="wrap">
							<div class="clip-block">
								<div class="clip-each clip-solid">
									<div class="social-share-block">
										<span class="social-each">
											<strong>10</strong>
										</span>{" "}
										<span>&hearts;</span>
									</div>
								</div>
							</div>

							<div class="clip-block">
								<a href="#container" class="clip-each clip-gradient">
									<div class="clip-caption">Products</div>
								</a>
								<Link to="/account" class="clip-each clip-border">
									<div class="clip-caption">Accounts</div>
								</Link>
							</div>

							<div class="clip-block">
								<a href="#" class="clip-tagline">
									Categories
								</a>
							</div>
							<svg class="clip-svg">
								<defs>
									<clipPath id="hexagon-clip" clipPathUnits="objectBoundingBox">
										<polygon points="0.25 0.05, 0.75 0.05, 1 0.5, 0.75 0.95, 0.25 0.95, 0 0.5" />
									</clipPath>
								</defs>
							</svg>

							<svg class="clip-svg">
								<defs>
									<clipPath
										id="triangle-clip"
										clipPathUnits="objectBoundingBox"
									>
										<polygon points="1 0.03, 0.17 1, 1 1" />
									</clipPath>
								</defs>
							</svg>
						</div>
						{/* <a href="#container">
							<button>
								Scroll <CgMouse />
							</button>
						</a> */}
					</div>
					<h2 className="homeHeading">Featured Products</h2>

					<div className="container1" id="container">
						{products &&
							products.map((product) => <ProductCard product={product} />)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Home;
