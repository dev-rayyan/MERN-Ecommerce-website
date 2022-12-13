import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { createCategory, clearErrors } from "../../actions/categoryAction";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newCategory);

  const [name, setName] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Category Created Successfully");
      navigate("/admin/categories");
      dispatch({ type: CREATE_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    dispatch(createCategory(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="card">
        <h1 id="productListHeading">Add New Category</h1>
        <div className="card-body px-0 py-0">
          <form
            className="AddProductForm"
            encType="multipart/form-data"
            onSubmit={createCategorySubmitHandler}
          >
            <div className="row">
              <div className="col1 col-lg-12">
                <div>
                  <label for="name" className="prodFormLabel">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Category Name"
                    className="prodFormInput"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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

export default CreateCategory;
