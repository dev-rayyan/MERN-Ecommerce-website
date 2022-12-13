import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { getAllCategories } from "../../actions/categoryAction";
import { getAllAttributes } from "../../actions/attributeAction";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  let { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const { categories } = useSelector((state) => state.categories);

  const { attributes } = useSelector((state) => state.attributes);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [SKU, setSKU] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const productId = id;

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllAttributes());
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setSKU(product.SKU);
      setName(product.name);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
      setInputOptionList(product.attributes);
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
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
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

    myForm.append("attributes", JSON.stringify(inputOptionList));

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  const categorySelectOptions = [];
  categories &&
    categories.forEach((item) => {
      categorySelectOptions.push({
        value: item.name,
        label: item.name,
      });
    });

  const [etarval, setEtarval] = useState("");

  const onAddBtnClick = (e) => {
    if (e.value) {
      setEtarval(e.value);
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

  const [inputOptionList, setInputOptionList] = useState([]);

  const handleOptionAdd = (e) => {
    e.preventDefault();
    if (etarval.length === 0) {
      alert.error("Select an Attribute");
    } else {
      for (let i = 0; i < inputOptionList.length; i++) {
        if (etarval === inputOptionList[i].name) {
          alert.error(`${etarval} is already added`);
          return;
        }
      }
      setInputOptionList([
        ...inputOptionList,
        {
          name: etarval,
          value: [],
        },
      ]);
    }
  };

  const handleInputOption = (selectedOption, index) => {
    const newinputOptionList = [...inputOptionList];
    newinputOptionList[index].value = selectedOption.map((opt) => opt.value);
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
        <h1 id="productListHeading">Add New Product</h1>
        <div className="card-body px-0 py-0">
          <form
            className="AddProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <div className="row">
              <div className="col-lg-9 border-right">
                <div className="row">
                  <div className="col1 col-lg-12">
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
                  <div className="col1 col-lg-3">
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
                  <div className="col1 col-lg-3">
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
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-3">
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
                        value={Stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-3" id="specdiv">
                    <div>
                      <label for="stock" className="prodFormLabel">
                        Category
                      </label>
                      {category.length > 0 ? (
                        <Select
                          className="basic-multi-select"
                          classNamePrefix="select"
                          options={categorySelectOptions}
                          required
                          defaultValue={{
                            value: category,
                            label: category,
                          }}
                          onChange={(e) => setCategory(e.value)}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col1 col-lg-12">
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
                  {oldImages.length === 0 ? (
                    <div className="col1 col-lg-12 flex-column align-items-start">
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
                          onChange={updateProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="col1 col-lg-4 flex-column align-items-start">
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
                          onChange={updateProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                  )}
                  {oldImages.length !== 0 ? (
                    <div className="col1 col-lg-8 flex-column align-items-start">
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
                        {oldImages.map((image, index) => (
                          <SplideSlide>
                            <img key={index} src={image.url} alt={image} />
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
                  <div className="col1 col-lg-12">
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
                          onClick={handleOptionAdd}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  {inputOptionList.length > 0
                    ? inputOptionList.map((input, index) => {
                        const SelectAttrOptions = [];
                        attributes &&
                          attributes.forEach((item) => {
                            if (item.name === input.name) {
                              item.options.forEach((itemOptions) => {
                                SelectAttrOptions.push({
                                  value: itemOptions.name,
                                  label: itemOptions.name,
                                });
                              });
                            }
                          });
                        return (
                          <Fragment>
                            <div className="col1 col-lg-12">
                              <div>
                                <label for="stock" className="prodFormLabel">
                                  {input.name}
                                </label>
                                <div className="selectAttrDiv">
                                  <Select
                                    isMulti
                                    name={input.name}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    options={SelectAttrOptions}
                                    defaultValue={input.value.map((opt) => ({
                                      value: opt,
                                      label: opt,
                                    }))}
                                    required
                                    multiple
                                    onChange={(selectedOption) =>
                                      handleInputOption(selectedOption, index)
                                    }
                                  />
                                  <button
                                    className="btn btn-danger ms-auto"
                                    onClick={(event) =>
                                      handleRemoveOption(event, index)
                                    }
                                  >
                                    <span role="img" aria-label="x emoji">
                                      ❌
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        );
                      })
                    : ""}
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

export default UpdateProduct;
