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
          <div className="container-fluid bg-100 home-section">
            <h1 className="section-title">Featured Products</h1>
            <div className="container" id="container">
              <div className="products">
                <div className="row">
                  <div className="col-lg-3">
                    <div class="productContainer">
                      <div class="productCard">
                        <div class="productCard-head-1">
                          <img
                            src="/imgs/adidas_white.png"
                            alt="logo"
                            class="card-logo"
                          />
                          <img
                            src="/imgs/5.png"
                            alt="Shoe"
                            class="product-img"
                          />
                          <div class="product-detail">
                            <h2 className="text-white">Nemeziz</h2> Support and
                            Nike Zoom Air come together for a more supportive
                            feel with high-speed responsiveness
                          </div>
                          <span class="back-text">FAS</span>
                        </div>
                        <div class="productCard-body">
                          <div class="product-desc">
                            <span class="product-title">
                              19.4<b>Nemeziz</b>
                              <span class="badge">New</span>
                            </span>
                            <span class="product-caption">Turf Collection</span>
                            <span class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star grey"></i>
                            </span>
                          </div>
                          <div class="product-properties">
                            <span class="product-size">
                              <h4>Size</h4>
                              <ul class="ul-size">
                                <li>
                                  <a href="#">7</a>
                                </li>
                                <li>
                                  <a href="#">8</a>
                                </li>
                                <li>
                                  <a href="#">9</a>
                                </li>
                                <li>
                                  <a href="#" class="active">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a href="#">11</a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-color">
                              <h4>Colour</h4>
                              <ul class="ul-color">
                                <li>
                                  <a href="#" class="orange active"></a>
                                </li>
                                <li>
                                  <a href="#" class="green"></a>
                                </li>
                                <li>
                                  <a href="#" class="yellow"></a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-price">
                              USD<b>23,453</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div class="productContainer">
                      <div class="productCard">
                        <div class="productCard-head-2">
                          <img
                            src="/imgs/adidas_white.png"
                            alt="logo"
                            class="card-logo"
                          />
                          <img
                            src="/imgs/1.png"
                            alt="Shoe"
                            class="product-img"
                          />
                          <div class="product-detail">
                            <h2 className="text-white">Predator</h2> Support and
                            Nike Zoom Air come together for a more supportive
                            feel with high-speed responsiveness
                          </div>
                          <span class="back-text">FAS</span>
                        </div>
                        <div class="productCard-body">
                          <div class="product-desc">
                            <span class="product-title">
                              .3<b>Predator</b>
                              <span class="badge">New</span>
                            </span>
                            <span class="product-caption">Turf Collection</span>
                            <span class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star grey"></i>
                            </span>
                          </div>
                          <div class="product-properties">
                            <span class="product-size">
                              <h4>Size</h4>
                              <ul class="ul-size">
                                <li>
                                  <a href="#">7</a>
                                </li>
                                <li>
                                  <a href="#">8</a>
                                </li>
                                <li>
                                  <a href="#">9</a>
                                </li>
                                <li>
                                  <a href="#" class="active">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a href="#">11</a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-color">
                              <h4>Colour</h4>
                              <ul class="ul-color">
                                <li>
                                  <a href="#" class="orange active"></a>
                                </li>
                                <li>
                                  <a href="#" class="green"></a>
                                </li>
                                <li>
                                  <a href="#" class="yellow"></a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-price">
                              USD<b>23,453</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div class="productContainer">
                      <div class="productCard">
                        <div class="productCard-head-3">
                          <img
                            src="/imgs/adidas_white.png"
                            alt="logo"
                            class="card-logo"
                          />
                          <img
                            src="/imgs/6.png"
                            alt="Shoe"
                            class="product-img"
                          />
                          <div class="product-detail">
                            <h2 className="text-white">Predator</h2> Support and
                            Nike Zoom Air come together for a more supportive
                            feel with high-speed responsiveness
                          </div>
                          <span class="back-text">FAS</span>
                        </div>
                        <div class="productCard-body">
                          <div class="product-desc">
                            <span class="product-title">
                              .4<b>Predator</b>
                              <span class="badge">New</span>
                            </span>
                            <span class="product-caption">Turf Collection</span>
                            <span class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star grey"></i>
                            </span>
                          </div>
                          <div class="product-properties">
                            <span class="product-size">
                              <h4>Size</h4>
                              <ul class="ul-size">
                                <li>
                                  <a href="#">7</a>
                                </li>
                                <li>
                                  <a href="#">8</a>
                                </li>
                                <li>
                                  <a href="#">9</a>
                                </li>
                                <li>
                                  <a href="#" class="active">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a href="#">11</a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-color">
                              <h4>Colour</h4>
                              <ul class="ul-color">
                                <li>
                                  <a href="#" class="orange active"></a>
                                </li>
                                <li>
                                  <a href="#" class="green"></a>
                                </li>
                                <li>
                                  <a href="#" class="yellow"></a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-price">
                              USD<b>23,453</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div class="productContainer">
                      <div class="productCard">
                        <div class="productCard-head-4">
                          <img
                            src="/imgs/adidas_white.png"
                            alt="logo"
                            class="card-logo"
                          />
                          <img
                            src="/imgs/3.png"
                            alt="Shoe"
                            class="product-img"
                          />
                          <div class="product-detail">
                            <h2 className="text-white">Copa</h2> Support and
                            Nike Zoom Air come together for a more supportive
                            feel with high-speed responsiveness
                          </div>
                          <span class="back-text">FAS</span>
                        </div>
                        <div class="productCard-body">
                          <div class="product-desc">
                            <span class="product-title">
                              .3<b>Copa</b>
                              <span class="badge">New</span>
                            </span>
                            <span class="product-caption">Turf Collection</span>
                            <span class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star grey"></i>
                            </span>
                          </div>
                          <div class="product-properties">
                            <span class="product-size">
                              <h4>Size</h4>
                              <ul class="ul-size">
                                <li>
                                  <a href="#">7</a>
                                </li>
                                <li>
                                  <a href="#">8</a>
                                </li>
                                <li>
                                  <a href="#">9</a>
                                </li>
                                <li>
                                  <a href="#" class="active">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a href="#">11</a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-color">
                              <h4>Colour</h4>
                              <ul class="ul-color">
                                <li>
                                  <a href="#" class="orange active"></a>
                                </li>
                                <li>
                                  <a href="#" class="green"></a>
                                </li>
                                <li>
                                  <a href="#" class="yellow"></a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-price">
                              USD<b>23,453</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div class="productContainer">
                      <div class="productCard">
                        <div class="productCard-head-5">
                          <img
                            src="/imgs/adidas_white.png"
                            alt="logo"
                            class="card-logo"
                          />
                          <img
                            src="/imgs/4.png"
                            alt="Shoe"
                            class="product-img"
                          />
                          <div class="product-detail">
                            <h2 className="text-white">X Speedflow</h2> Support
                            and Nike Zoom Air come together for a more
                            supportive feel with high-speed responsiveness
                          </div>
                          <span class="back-text">FAS</span>
                        </div>
                        <div class="productCard-body">
                          <div class="product-desc">
                            <span class="product-title">
                              .4<b>Speedflow</b>
                              <span class="badge">New</span>
                            </span>
                            <span class="product-caption">Turf Collection</span>
                            <span class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star grey"></i>
                            </span>
                          </div>
                          <div class="product-properties">
                            <span class="product-size">
                              <h4>Size</h4>
                              <ul class="ul-size">
                                <li>
                                  <a href="#">7</a>
                                </li>
                                <li>
                                  <a href="#">8</a>
                                </li>
                                <li>
                                  <a href="#">9</a>
                                </li>
                                <li>
                                  <a href="#" class="active">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a href="#">11</a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-color">
                              <h4>Colour</h4>
                              <ul class="ul-color">
                                <li>
                                  <a href="#" class="orange active"></a>
                                </li>
                                <li>
                                  <a href="#" class="green"></a>
                                </li>
                                <li>
                                  <a href="#" class="yellow"></a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-price">
                              USD<b>23,453</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div class="productContainer">
                      <div class="productCard">
                        <div class="productCard-head-6">
                          <img
                            src="/imgs/adidas_white.png"
                            alt="logo"
                            class="card-logo"
                          />
                          <img
                            src="/imgs/7.png"
                            alt="Shoe"
                            class="product-img"
                          />
                          <div class="product-detail">
                            <h2 className="text-white">Predator</h2> Support and
                            Nike Zoom Air come together for a more supportive
                            feel with high-speed responsiveness
                          </div>
                          <span class="back-text">FAS</span>
                        </div>
                        <div class="productCard-body">
                          <div class="product-desc">
                            <span class="product-title">
                              .3<b>Predator</b>
                              <span class="badge">New</span>
                            </span>
                            <span class="product-caption">Turf Collection</span>
                            <span class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star grey"></i>
                            </span>
                          </div>
                          <div class="product-properties">
                            <span class="product-size">
                              <h4>Size</h4>
                              <ul class="ul-size">
                                <li>
                                  <a href="#">7</a>
                                </li>
                                <li>
                                  <a href="#">8</a>
                                </li>
                                <li>
                                  <a href="#">9</a>
                                </li>
                                <li>
                                  <a href="#" class="active">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a href="#">11</a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-color">
                              <h4>Colour</h4>
                              <ul class="ul-color">
                                <li>
                                  <a href="#" class="orange active"></a>
                                </li>
                                <li>
                                  <a href="#" class="green"></a>
                                </li>
                                <li>
                                  <a href="#" class="yellow"></a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-price">
                              USD<b>23,453</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div class="productContainer">
                      <div class="productCard">
                        <div class="productCard-head-7">
                          <img
                            src="/imgs/adidas_white.png"
                            alt="logo"
                            class="card-logo"
                          />
                          <img
                            src="/imgs/8.png"
                            alt="Shoe"
                            class="product-img"
                          />
                          <div class="product-detail">
                            <h2 className="text-white">Nemeziz</h2> Support and
                            Nike Zoom Air come together for a more supportive
                            feel with high-speed responsiveness
                          </div>
                          <span class="back-text">FAS</span>
                        </div>
                        <div class="productCard-body">
                          <div class="product-desc">
                            <span class="product-title">
                              18.3<b>Nemeziz</b>
                              <span class="badge">New</span>
                            </span>
                            <span class="product-caption">
                              Indoor Court Collection
                            </span>
                            <span class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star grey"></i>
                            </span>
                          </div>
                          <div class="product-properties">
                            <span class="product-size">
                              <h4>Size</h4>
                              <ul class="ul-size">
                                <li>
                                  <a href="#">7</a>
                                </li>
                                <li>
                                  <a href="#">8</a>
                                </li>
                                <li>
                                  <a href="#">9</a>
                                </li>
                                <li>
                                  <a href="#" class="active">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a href="#">11</a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-color">
                              <h4>Colour</h4>
                              <ul class="ul-color">
                                <li>
                                  <a href="#" class="orange active"></a>
                                </li>
                                <li>
                                  <a href="#" class="green"></a>
                                </li>
                                <li>
                                  <a href="#" class="yellow"></a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-price">
                              USD<b>23,453</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div class="productContainer">
                      <div class="productCard">
                        <div class="productCard-head-8">
                          <img
                            src="/imgs/adidas_white.png"
                            alt="logo"
                            class="card-logo"
                          />
                          <img
                            src="/imgs/2.png"
                            alt="Shoe"
                            class="product-img"
                          />
                          <div class="product-detail">
                            <h2 className="text-white">Nemeziz</h2> Support and
                            Nike Zoom Air come together for a more supportive
                            feel with high-speed responsiveness
                          </div>
                          <span class="back-text">FAS</span>
                        </div>
                        <div class="productCard-body">
                          <div class="product-desc">
                            <span class="product-title">
                              .3<b>Nemeziz</b>
                              <span class="badge">New</span>
                            </span>
                            <span class="product-caption">Turf Collection</span>
                            <span class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star grey"></i>
                            </span>
                          </div>
                          <div class="product-properties">
                            <span class="product-size">
                              <h4>Size</h4>
                              <ul class="ul-size">
                                <li>
                                  <a href="#">7</a>
                                </li>
                                <li>
                                  <a href="#">8</a>
                                </li>
                                <li>
                                  <a href="#">9</a>
                                </li>
                                <li>
                                  <a href="#" class="active">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a href="#">11</a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-color">
                              <h4>Colour</h4>
                              <ul class="ul-color">
                                <li>
                                  <a href="#" class="orange active"></a>
                                </li>
                                <li>
                                  <a href="#" class="green"></a>
                                </li>
                                <li>
                                  <a href="#" class="yellow"></a>
                                </li>
                              </ul>
                            </span>
                            <span class="product-price">
                              USD<b>23,453</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
