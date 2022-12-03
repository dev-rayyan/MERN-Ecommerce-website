import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import {
  AccountTree,
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
} from "@mui/icons-material";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryAction";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const { categories } = useSelector((state) => state.categories);

  const [SKU, setSKU] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("SKU", SKU);
    myForm.set("visibleOnSite", visibility);
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
    console.log(myForm);
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="card">
        <h1 id="productListHeading">Add New Product</h1>
        <div className="card-body px-0 py-0">
          <form className="AddProductForm">
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <label for="name">Product Title</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Product Title"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <label for="SKU">SKU</label>
                  <input
                    type="text"
                    name="SKU"
                    placeholder="Enter Product SKU"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <label for="price">Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter Product Price"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <label for="stock">Stock</label>
                  <input
                    type="text"
                    name="stock"
                    placeholder="Enter Product Stock"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div>
                  <label for="stock">Category</label>
                  <select>
                    <option disabled selected hidden>
                      Select Product Category
                    </option>
                    <option>abc</option>
                    <option>def</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-8"></div>
              <div className="col-lg-8">
                <div>
                  <label for="description">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter Product Description..."
                  />
                </div>
              </div>
              <div className="col-lg-4 flex-column align-items-start">
                <label style={{ fontSize: "15px", margin: 0 }}>Images</label>
                <div className="file-input">
                  <label className="forImg" for="images">
                    Select File
                  </label>
                  <input
                    type="file"
                    name="images"
                    className="file"
                    placeholder="Select Product Images"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div>
                  <input type="submit" className="btn btn-primary" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
