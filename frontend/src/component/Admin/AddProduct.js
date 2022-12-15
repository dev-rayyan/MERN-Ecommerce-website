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
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import ContentEditable from "react-contenteditable";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const { categories } = useSelector((state) => state.categories);

  const { attributes } = useSelector((state) => state.attributes);

  const [displayColorPicker1, setDisplayColorPicker1] = useState(false);
  const [displayColorPicker2, setDisplayColorPicker2] = useState(false);
  const [brandLogo, setBrandLogo] = useState();
  const [productTitle, setProductTitle] = useState("Title");
  const [shortDescription, setShortDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
  );
  const [mainImage, setMainImage] = useState([]);
  const [productName, setProductName] = useState("Name");
  const [productCollection, setProductCollection] = useState("Collection");
  console.log(brandLogo);
  const [color1, setColor1] = useState({
    r: "182",
    g: "182",
    b: "182",
    a: "1",
  });
  const [color2, setColor2] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "1",
  });
  const [SKU, setSKU] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleClick1 = () => {
    setDisplayColorPicker1(!displayColorPicker1);
  };

  const handleClose1 = () => {
    setDisplayColorPicker1(false);
  };
  const handleChange1 = (color1) => {
    setColor1(color1.rgb);
  };

  const handleClick2 = () => {
    setDisplayColorPicker2(!displayColorPicker2);
  };

  const handleClose2 = () => {
    setDisplayColorPicker2(false);
  };
  const handleChange2 = (color2) => {
    setColor2(color2.rgb);
  };

  const brandLogoHandler = (e) => {
    const files = Array.from(e.target.files);

    setBrandLogo([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setBrandLogo((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const mainImageHandler = (e) => {
    const files = Array.from(e.target.files);

    setMainImage([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setMainImage((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const styles1 = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${color1.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
      Phead: {
        background: `linear-gradient(135deg, rgba(${color1.r}, ${color1.g}, ${color1.b}, ${color1.a}) 8%, rgba(${color2.r}, ${color2.g}, ${color2.b}, ${color2.a}) 83%)`,
      },
    },
  });

  const styles2 = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${color2.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

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

    myForm.append("attributes", JSON.stringify(inputOptionList));

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

  const categorySelectOptions = [];

  categories &&
    categories.forEach((item) => {
      categorySelectOptions.push({
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
            onSubmit={createProductSubmitHandler}
          >
            <div className="row">
              <div className="col-lg-9 border-right">
                <div className="row">
                  <div className="col1 col-lg-4 flex-column align-items-start">
                    <label style={{ fontSize: "15px", margin: 0 }}>
                      Brand logo
                    </label>
                    <div className="file-input">
                      <label className="forImg prodFormLabel" for="images">
                        Select Image
                      </label>
                      <input
                        type="file"
                        name="images"
                        placeholder="Select Product Images"
                        className="prodFormInputFile file"
                        accept="image/*"
                        onChange={brandLogoHandler}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-4">
                    <div>
                      <label for="name" className="prodFormLabel">
                        Product Title
                      </label>
                      <input
                        type="text"
                        name="name"
                        maxLength="10"
                        placeholder="Enter Product Title"
                        className="prodFormInput"
                        required
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-4">
                    <div>
                      <label for="description" className="prodFormLabel">
                        Short Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        maxlength="100"
                        placeholder="Enter Short Description..."
                        className="prodFormTextArea"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-4 flex-column align-items-start">
                    <label style={{ fontSize: "15px", margin: 0 }}>
                      Main Image
                    </label>
                    <div className="file-input">
                      <label className="forImg prodFormLabel" for="images">
                        Select Image
                      </label>
                      <input
                        type="file"
                        name="images"
                        placeholder="Select Product Images"
                        className="prodFormInputFile file"
                        accept="image/*"
                        onChange={mainImageHandler}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-4">
                    <div>
                      <label for="name" className="prodFormLabel">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Product Title"
                        className="prodFormInput"
                        required
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-4">
                    <div>
                      <label for="name" className="prodFormLabel">
                        Product Collection
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Product Title"
                        className="prodFormInput"
                        required
                        value={productCollection}
                        onChange={(e) => setProductCollection(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-2">
                    <div>
                      <label for="name" className="prodFormLabel">
                        Gradient Color 1
                      </label>
                      <div style={styles1.swatch} onClick={handleClick1}>
                        <div style={styles1.color} />
                      </div>
                      {displayColorPicker1 ? (
                        <div style={styles1.popover}>
                          <div style={styles1.cover} onClick={handleClose1} />
                          <SketchPicker
                            color={color1}
                            onChange={handleChange1}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col1 col-lg-2">
                    <div>
                      <label for="name" className="prodFormLabel">
                        Gradient Color 2
                      </label>
                      <div style={styles2.swatch} onClick={handleClick2}>
                        <div style={styles2.color} />
                      </div>
                      {displayColorPicker2 ? (
                        <div style={styles2.popover}>
                          <div style={styles2.cover} onClick={handleClose2} />
                          <SketchPicker
                            color={color2}
                            onChange={handleChange2}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
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
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col1 col-lg-3" id="specdiv">
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
                  {imagesPreview.length === 0 ? (
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
                          onChange={createProductImagesChange}
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
                          onChange={createProductImagesChange}
                          multiple
                        />
                      </div>
                    </div>
                  )}
                  {imagesPreview.length !== 0 ? (
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
              </div>
              <div className="col-lg-3">
                <h3 className="text-center">ProductCard Preview</h3>
                <div class="productContainer">
                  <div class="productCard">
                    <div class="productCard-head-1" style={styles1.Phead}>
                      <div class="image-upload">
                        <label for="file-input2">
                          {brandLogo && brandLogo.length > 0 ? (
                            <img src={brandLogo} alt="Shoe" class="card-logo" />
                          ) : (
                            <h5 className="card-logo text-white">Logo</h5>
                          )}
                        </label>
                        <input
                          onChange={brandLogoHandler}
                          id="file-input2"
                          type="file"
                        />
                      </div>
                      <div class="image-upload ab">
                        <label for="file-input1">
                          <img
                            src={
                              mainImage && mainImage.length > 0
                                ? mainImage
                                : "/imgs/select_grey1.png"
                            }
                            alt="Shoe"
                            class="product-img"
                          />
                        </label>
                        <input
                          onChange={mainImageHandler}
                          id="file-input1"
                          type="file"
                        />
                      </div>

                      <div class="product-detail">
                        <h2 className="text-white">
                          <div
                            contentEditable="true"
                            onInput={(e) =>
                              setProductTitle(e.currentTarget.textContent)
                            }
                          >
                            Product Title
                          </div>
                        </h2>
                        <div
                          contentEditable="true"
                          onInput={(e) =>
                            setShortDescription(e.currentTarget.textContent)
                          }
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore
                        </div>
                      </div>
                      {/* <span class="back-text">FAS</span> */}
                    </div>
                    <div class="productCard-body">
                      <div class="product-desc">
                        <span class="product-title">
                          <span
                            contentEditable="true"
                            onInput={(e) =>
                              setProductName(e.currentTarget.textContent)
                            }
                          >
                            19.4
                          </span>
                          <b
                            contentEditable="true"
                            onInput={(e) =>
                              setProductTitle(e.currentTarget.textContent)
                            }
                          >
                            Product Title
                          </b>
                          <span class="badge">New</span>
                        </span>
                        <span class="product-caption">
                          <div
                            contentEditable="true"
                            onInput={(e) =>
                              setProductCollection(e.currentTarget.textContent)
                            }
                          >
                            Collection
                          </div>
                        </span>
                        <span class="product-rating">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star grey"></i>
                        </span>
                      </div>
                      <div class="product-properties">
                        <span class="product-size">
                          <h4>Size</h4>
                          <ul class="ul-size">
                            <li>
                              <a href="#">7</a>
                            </li>
                            <li>
                              <a href="#">8</a>
                            </li>
                            <li>
                              <a href="#">9</a>
                            </li>
                            <li>
                              <a href="#" class="active">
                                10
                              </a>
                            </li>
                            <li>
                              <a href="#">11</a>
                            </li>
                          </ul>
                        </span>
                        <span class="product-color">
                          <h4>Colour</h4>
                          <ul class="ul-color">
                            <li>
                              <a href="#" class="orange active"></a>
                            </li>
                            <li>
                              <a href="#" class="green"></a>
                            </li>
                            <li>
                              <a href="#" class="yellow"></a>
                            </li>
                          </ul>
                        </span>
                        <span class="product-price">
                          USD<b>23,453</b>
                        </span>
                      </div>
                    </div>
                  </div>
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

export default NewProduct;
