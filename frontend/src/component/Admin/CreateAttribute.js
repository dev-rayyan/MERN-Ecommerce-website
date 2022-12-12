import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { CREATE_ATTRIBUTE_RESET } from "../../constants/attributeConstants";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryAction";
import {
  createAttribute,
  getAllAttributes,
} from "../../actions/attributeAction";

const CreateAttribute = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newAttribute
  );

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllAttributes());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Attribute Created Successfully");
      navigate("/admin/attributes");
      dispatch({ type: CREATE_ATTRIBUTE_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createAttributeSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);

    myForm.set("options", JSON.stringify(inputOptionList));

    dispatch(createAttribute(myForm));
  };

  const [inputOptionList, setInputOptionList] = useState([]);

  const handleOptionAdd = (e) => {
    e.preventDefault();
    setInputOptionList([
      ...inputOptionList,
      {
        optionName: "",
        optionLabel: "",
      },
    ]);
  };

  const handleInputOptionName = (event, index) => {
    const { value } = event.target;
    const newinputOptionList = [...inputOptionList];
    newinputOptionList[index].optionName = value;
    setInputOptionList(newinputOptionList);
  };

  const handleInputOptionLabel = (event, index) => {
    const { value } = event.target;
    const newinputOptionList = [...inputOptionList];
    newinputOptionList[index].optionLabel = value;
    setInputOptionList(newinputOptionList);
  };

  const handleRemoveOption = (e, index) => {
    e.preventDefault();
    const newList = [...inputOptionList];
    newList.splice(index, 1);
    setInputOptionList(newList);
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
              {inputOptionList.length > 0
                ? inputOptionList.map((input, index) => (
                    <Fragment>
                      <div className="col1 col-lg-5" key={index}>
                        <div>
                          <label for="stock" className="prodFormLabel">
                            Option Name
                          </label>
                          <input
                            type="text"
                            name="optionName"
                            placeholder="Enter Option Name"
                            className="prodFormInput"
                            required
                            label={`input ${index + 1}`}
                            onChange={(event) =>
                              handleInputOptionName(event, index)
                            }
                          />
                        </div>
                      </div>
                      <div className="col1 col-lg-5">
                        <div>
                          <label for="stock" className="prodFormLabel">
                            Option Label
                          </label>
                          <input
                            type="text"
                            name="optionLabel"
                            placeholder="Enter Option Label"
                            className="prodFormInput"
                            required
                            onChange={(event) =>
                              handleInputOptionLabel(event, index)
                            }
                          />
                        </div>
                      </div>
                      <div className="col1 col-lg-1">
                        <div className="d-flex align-items-center justify-content-end">
                          <button
                            className="btn btn-danger"
                            onClick={(e) => handleRemoveOption(e, index)}
                          >
                            <span role="img" aria-label="x emoji">
                              ❌
                            </span>
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ))
                : ""}
              <div className="col1 col-lg-12">
                <div>
                  <button className="btn btn-warning" onClick={handleOptionAdd}>
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
