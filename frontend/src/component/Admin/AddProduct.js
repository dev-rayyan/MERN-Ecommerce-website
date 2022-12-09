import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../actions/categoryAction";
import { getAllAttributes } from "../../actions/attributeAction";
import Select from "react-select";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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

    myForm.append("attributes", JSON.stringify(attributesSend));

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
      <div className="col col-lg-12">
        <div>
          <label for="stock" className="prodFormLabel">
            {props.name}
          </label>
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
  };
  const [etarval, setEtarval] = useState("");

  const onAddBtnClick = (e) => {
    if (e.value) {
      setEtarval(e.value);
    }
  };
  const attrSelectNo = [];

  attributesList &&
    attributesList.forEach((item) => {
      attrSelectNo.push(item.props.name);
    });

  const addAttrOnClick = (e) => {
    e.preventDefault();
    if (attrSelectNo.length === 0) {
      console.log(etarval.length);
      if (etarval.length === 0) {
        alert.error(`Select an Attribute`);
      } else {
        setAttributesList(
          attributesList.concat(
            <Attribute name={etarval} key={attributesList.length} />
          )
        );
      }
    } else {
      var isFound2 = false;
      for (let i = 0; i < attrSelectNo.length; i++) {
        if (etarval === attrSelectNo[i]) {
          isFound2 = true;
          alert.error(`${etarval} is already added`);
        }
      }
      if (isFound2) {
      } else {
        setAttributesList(
          attributesList.concat(
            <Attribute name={etarval} key={attributesList.length} />
          )
        );
      }
    }
  };

  const AddSelectAttrOptions = [];
  attributes &&
    attributes.forEach((item) => {
      AddSelectAttrOptions.push({
        value: item.name,
        label: item.name,
      });
    });

  const categorySelectOptions = [];
  categories &&
    categories.forEach((item) => {
      categorySelectOptions.push({
        value: item.name,
        label: item.name,
      });
    });
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
              <div className="col-lg-9 border-right">
                <div className="row">
                  <div className="col col-lg-12">
                    <div>
                      <label for="name" className="prodFormLabel">
                        Product Title
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Product Title"
                        className="prodFormInput"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-3">
                    <div>
                      <label for="SKU" className="prodFormLabel">
                        SKU
                      </label>
                      <input
                        type="text"
                        name="SKU"
                        placeholder="Enter Product SKU"
                        className="prodFormInput"
                        required
                        value={SKU}
                        onChange={(e) => setSKU(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-3">
                    <div>
                      <label for="price" className="prodFormLabel">
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        placeholder="Enter Product Price"
                        className="prodFormInput"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-3">
                    <div>
                      <label for="stock" className="prodFormLabel">
                        Stock
                      </label>
                      <input
                        type="text"
                        name="stock"
                        placeholder="Enter Product Stock"
                        className="prodFormInput"
                        required
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-3" id="specdiv">
                    <div>
                      <label for="stock" className="prodFormLabel">
                        Category
                      </label>
                      <Select
                        className="basic-multi-select"
                        classNamePrefix="select"
                        options={categorySelectOptions}
                        required
                        onChange={(e) => setCategory(e.value)}
                      />
                    </div>
                  </div>
                  <div className="col col-lg-12">
                    <div>
                      <label for="description" className="prodFormLabel">
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        placeholder="Enter Product Description..."
                        className="prodFormTextArea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  {imagesPreview.length === 0 ? (
                    <div className="col col-lg-12 flex-column align-items-start">
                      <label style={{ fontSize: "15px", margin: 0 }}>
                        Images
                      </label>
                      <div className="file-input">
                        <label className="forImg prodFormLabel" for="images">
                          Select File
                        </label>
                        <input
                          type="file"
                          name="images"
                          placeholder="Select Product Images"
                          className="prodFormInputFile file"
                          accept="image/*"
                          onChange={createProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="col col-lg-4 flex-column align-items-start">
                      <label style={{ fontSize: "15px", margin: 0 }}>
                        Images
                      </label>
                      <div className="file-input">
                        <label className="forImg prodFormLabel" for="images">
                          Select Images...
                        </label>
                        <input
                          type="file"
                          name="images"
                          placeholder="Select Product Images"
                          className="prodFormInputFile file"
                          accept="image/*"
                          onChange={createProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                  )}
                  {imagesPreview.length !== 0 ? (
                    <div className="col col-lg-8 flex-column align-items-start">
                      <label className="prodFormLabel">Images Preview</label>
                      <Splide
                        options={{
                          rewind: true,
                          fixedWidth: 230,
                          fixedHeight: 230,
                          isNavigation: true,
                          gap: 10,
                          focus: "center",
                          pagination: false,
                          cover: true,
                          arrows: false,
                          dragMinThreshold: {
                            mouse: 4,
                            touch: 10,
                          },
                          breakpoints: {
                            640: {
                              fixedWidth: 66,
                              fixedHeight: 38,
                            },
                          },
                        }}
                        aria-label="My Favorite Images"
                      >
                        {imagesPreview.map((image, index) => (
                          <SplideSlide>
                            <img key={index} src={image} alt={image} />
                          </SplideSlide>
                        ))}
                      </Splide>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="row">
                  <div className="col col-lg-12">
                    <div>
                      <label className="prodFormLabel">
                        Product Attributes
                      </label>
                      <div className="selectAttrDiv">
                        <Select
                          className="basic-multi-select"
                          classNamePrefix="select"
                          options={AddSelectAttrOptions}
                          required
                          onChange={(e) => onAddBtnClick(e)}
                        />
                        <button
                          className="btn btn-primary ms-auto"
                          onClick={addAttrOnClick}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  {attributesList}
                </div>
              </div>
              <div className="col col-lg-12">
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
