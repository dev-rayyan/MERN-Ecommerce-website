import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/lab";
import { Fragment } from "react";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link to={`/product/${product._id}`}>
      <div className="productCard card">
        <div className="imgBox">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <div className="contentBox">
          <p className="prodTitle">{product.name}</p>
          <div className="ratingBox">
            <Rating {...options} />
            <span> ({product.numOfReviews})</span>
          </div>
          <p className="prodPrice">{`₹${product.price}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
