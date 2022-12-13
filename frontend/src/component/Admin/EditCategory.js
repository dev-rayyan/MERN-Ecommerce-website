import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryDetails,
  updateCategory,
  clearErrors,
} from "../../actions/categoryAction";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";

const EditCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  let { id } = useParams();

  const { error, category } = useSelector((state) => state.categoryDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.category);

  const [name, setName] = useState("");

  const categoryId = id;

  useEffect(() => {
    if (category && category._id !== categoryId) {
      dispatch(getCategoryDetails(categoryId));
    } else {
      setName(category.name);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Category Updated Successfully");
      navigate("/admin/categories");
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    categoryId,
    category,
    updateError,
  ]);

  const updateCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);

    dispatch(updateCategory(categoryId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="card">
        <h1 id="productListHeading">Edit Category</h1>
        <div className="card-body px-0 py-0">
          <form
            className="AddProductForm"
            encType="multipart/form-data"
            onSubmit={updateCategorySubmitHandler}
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

export default EditCategory;
