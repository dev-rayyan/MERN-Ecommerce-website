import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link to={`/product/${product._id}`}>
      <div className="productCard card m-3">
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
            <span> ({product.numOfReviews})</span>
          </div>
          <p className="prodPrice">{`Rs ${product.price}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
