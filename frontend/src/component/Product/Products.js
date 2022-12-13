import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { getAllCategories } from "../../actions/categoryAction";

const Products = () => {
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setcurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 25000]);

  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  let { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getAllCategories());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products --- Ecommerce" />
          <h1 className="heading">Products</h1>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2">
                <div className="filterBox">
                  <h3>Filters</h3>
                  <div className="row">
                    <h5>Categories</h5>
                    <ul className="categoryBox">
                      {categories &&
                        categories.map((category) => (
                          <li
                            className="category-link"
                            key={category._id}
                            onClick={() => setCategory(category.name)}
                          >
                            {category.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <Typography>Price</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="on"
                    getAriaLabel={() => "Temperature range"}
                    min={0}
                    max={25000}
                  />
                  <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                      value={ratings}
                      onChange={(e, newRating) => {
                        setRatings(newRating);
                      }}
                      aria-label="continuous-slider"
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                    />
                  </fieldset>
                </div>
              </div>
              <div className="col-lg-10">
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
              {resultPerPage < count && (
                <div className="paginationbox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
