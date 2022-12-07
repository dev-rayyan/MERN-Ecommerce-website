import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryAction";
import $ from "jquery";
import { render } from "react-dom";
import { getAllAttributes } from "../../actions/attributeAction";
import Select from "react-select";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const { categories } = useSelector((state) => state.categories);

  const { attributes } = useSelector((state) => state.attributes);

  const [SKU, setSKU] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  var [attributesSend, setAttributesSend] = useState([]);

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

    myForm.append("attrs", JSON.stringify(attributesSend));

    attributesSend.forEach((attr) => {
      myForm.append("attr_name", attr.name);
      myForm.append("attr_val", JSON.stringify(attr.value));

      console.log(attr.value);
    });

    dispatch(createProduct(myForm));
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
  var attributesListdb = ["size", "color"];
  const Attribute = (props) => {
    const SelectAttrOptions = [];
    attributes &&
      attributes.forEach((item) => {
        if (item.name === props.name) {
          item.options.forEach((itemOptions) => {
            SelectAttrOptions.push({
              value: itemOptions.name,
              label: itemOptions.name,
            });
          });
        }
      });
    return (
      <div className="col-lg-4" id="specdiv">
        <div>
          <label for="stock">{props.name}</label>
          <Select
            isMulti
            name={props.name}
            className="basic-multi-select"
            classNamePrefix="select"
            options={SelectAttrOptions}
            required
            multiple
            onChange={(selectedOption) =>
              attributesHandler(selectedOption, props)
            }
          />
        </div>
      </div>
    );
  };
  const [attributesList, setAttributesList] = useState([]);

  const attributesHandler = (selectedOption, props) => {
    var loopvar = [];
    var SelectName = props.name;

    if (attributesSend.length === 0) {
      attributesSend.push({
        name: props.name,
        value: selectedOption.map((opt) => opt.value),
      });
    } else {
      attributesSend.forEach((item) => {
        loopvar.push(item.name);
      });
      var isFound = false;
      for (let i = 0; i < loopvar.length; i++) {
        if (loopvar[i] === SelectName) {
          isFound = true;
          var counter = 0;
          attributesSend.forEach((item) => {
            if (item.name === loopvar[i]) {
              attributesSend[counter] = {
                name: props.name,
                value: selectedOption.map((opt) => opt.value),
              };
            }
            counter++;
          });
        }
      }
      if (isFound) {
      } else {
        attributesSend.push({
          name: props.name,
          value: selectedOption.map((opt) => opt.value),
        });
      }
    }
    console.log(attributesSend);
  };

  const onAddBtnClick = (e) => {
    if (e.target.value) {
      setAttributesList(
        attributesList.concat(
          <Attribute name={e.target.value} key={attributesList.length} />
        )
      );
    }
  };
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="card">
        <h1 id="productListHeading">Add New Product</h1>
        <div className="card-body px-0 py-0">
          <form
            className="AddProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <label for="name">Product Title</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Product Title"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    required
                    value={SKU}
                    onChange={(e) => setSKU(e.target.value)}
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
                    required
                    onChange={(e) => setPrice(e.target.value)}
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
                    required
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4" id="specdiv">
                <div>
                  <label for="stock">Category</label>
                  <select
                    required
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option disabled selected hidden>
                      Select Product Category
                    </option>
                    {categories &&
                      categories.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              {attributesList}
              <div className="col-lg-4">
                <div>
                  <label for="stock">Add Attributes</label>
                  <select required onChange={onAddBtnClick}>
                    <option disabled selected hidden>
                      Add Attribute
                    </option>
                    {attributesListdb.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-8">
                <div>
                  <label for="description">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter Product Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
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
