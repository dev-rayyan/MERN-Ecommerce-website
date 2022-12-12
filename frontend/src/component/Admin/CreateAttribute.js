import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryAction";
import {
  createAttribute,
  getAllAttributes,
} from "../../actions/attributeAction";
import Select from "react-select";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const CreateAttribute = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [optionName, setOptionName] = useState("");
  const [optionLabel, setOptionLabel] = useState("");

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllAttributes());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createAttributeSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);

    dispatch(createProduct(myForm));
  };

  console.log(optionName, optionLabel);
  const AttributeOptions = () => {
    return (
      <Fragment>
        <div className="col1 col-lg-6">
          <div>
            <label for="stock" className="prodFormLabel">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Option Name"
              className="prodFormInput"
              required
              onChange={(e) => setOptionName(e.target.value)}
            />
          </div>
        </div>
        <div className="col1 col-lg-6">
          <div>
            <label for="stock" className="prodFormLabel">
              Label
            </label>
            <input
              type="text"
              name="label"
              placeholder="Enter Option Label"
              className="prodFormInput"
              required
              onChange={(e) => setOptionLabel(e.target.value)}
            />
          </div>
        </div>
      </Fragment>
    );
  };
  const [attributesOptions, setAttributesOptions] = useState([]);

  const addAttrOptions = (e) => {
    e.preventDefault();
    setAttributesOptions(
      attributesOptions.concat(
        <AttributeOptions key={attributesOptions.length} />
      )
    );
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="card">
        <h1 id="productListHeading">Add New Attribute</h1>
        <div className="card-body px-0 py-0">
          <form
            className="AddProductForm"
            encType="multipart/form-data"
            onSubmit={createAttributeSubmitHandler}
          >
            <div className="row">
              <div className="col1 col-lg-12">
                <div>
                  <label for="name" className="prodFormLabel">
                    Attribute Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Attribute Name"
                    className="prodFormInput"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {attributesOptions}
              <div className="col1 col-lg-12">
                <div>
                  <button className="btn btn-warning" onClick={addAttrOptions}>
                    Add Attribute Options
                  </button>
                </div>
              </div>

              <div className="col1 col-lg-12">
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

export default CreateAttribute;
