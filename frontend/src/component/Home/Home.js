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
            <div className="wrap">
              <div className="clip-block">
                <div className="clip-each clip-solid">
                  <div className="social-share-block">
                    <span className="social-each">
                      <strong>10</strong>
                    </span>{" "}
                    <span>&hearts;</span>
                  </div>
                </div>
              </div>

              <div className="clip-block">
                <a href="#container" className="clip-each clip-gradient">
                  <div className="clip-caption">Products</div>
                </a>
                <Link to="/profile" className="clip-each clip-border">
                  <div className="clip-caption">Profile</div>
                </Link>
              </div>

              <div className="clip-block">
                <a href="#" className="clip-tagline">
                  Categories
                </a>
              </div>
              <svg className="clip-svg">
                <defs>
                  <clipPath id="hexagon-clip" clipPathUnits="objectBoundingBox">
                    <polygon points="0.25 0.05, 0.75 0.05, 1 0.5, 0.75 0.95, 0.25 0.95, 0 0.5" />
                  </clipPath>
                </defs>
              </svg>

              <svg className="clip-svg">
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
          </div>
          <div className="container-fluid bg-200 home-section">
            <h1 className="section-title">Featured Products</h1>
            <div className="container" id="container">
              <div className="products">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Fragment>
                        <div className="col-lg-3">
                          <ProductCard key={product._id} product={product} />
                        </div>
                      </Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
