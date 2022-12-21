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
import ColorPicker from "react-best-gradient-color-picker";
import Popup from "reactjs-popup";
import Tooltip from "@mui/material/Tooltip";
import Draggable from "react-draggable";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ResizableRect from "./ResizeableReact";
import $ from "jquery";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { WidthFull, WorkRounded } from "@mui/icons-material";
import Editable from "react-text-content-editable";
const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const { categories } = useSelector((state) => state.categories);

  const { attributes } = useSelector((state) => state.attributes);
  const [color, setColor] = useState(
    "linear-gradient(135deg, rgba(250, 120, 46, 1) 8%, rgba(200, 41, 48, 1) 83%)"
  );
  const [price, setPrice] = useState(1234);
  const [currency, setCurrency] = useState("USD");
  const [brandLogo, setBrandLogo] = useState();
  const [productCategory, setProductCategory] = useState("Category");
  const [shortDescription, setShortDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
  );
  const [mainImage, setMainImage] = useState([]);
  const [productName, setProductName] = useState("Name");
  const [productCollection, setProductCollection] =
    useState("Product Collection");
  const [SKU, setSKU] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const brandLogoHandler = (e) => {
    setLogoLibaray(true);
    // const files = Array.from(e.target.files);

    // setBrandLogo([]);

    // files.forEach((file) => {
    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setBrandLogo((old) => [...old, reader.result]);
    //     }
    //   };

    //   reader.readAsDataURL(file);
    // });
  };
  const [mainLibaray, setMainLibaray] = useState(false);
  const [logoLibaray, setLogoLibaray] = useState(false);

  const mainImageHandler = (e) => {
    setMainLibaray(true);
    // const files = Array.from(e.target.files);
    // setMainImage([]);
    // files.forEach((file) => {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setMainImage((old) => [...old, reader.result]);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // });
  };

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
  const [positionImage, setPositionImage] = useState({ x: 0, y: 0 });

  const trackPosImage = (data) => {
    setPositionImage({ x: data.x, y: data.y });
  };

  const [positionCategory, setPositionCategory] = useState({ x: 0, y: 0 });

  const trackPosCategory = (data) => {
    setPositionCategory({ x: data.x, y: data.y });
  };

  const [positionShortDesc, setPositionShortDesc] = useState({ x: 0, y: 0 });

  const trackPosShortDesc = (data) => {
    setPositionShortDesc({ x: data.x, y: data.y });
  };

  const [positionLogo, setPositionLogo] = useState({ x: 0, y: 0 });

  const trackPosLogo = (data) => {
    setPositionLogo({ x: data.x, y: data.y });
  };

  const [positionMain, setPositionMain] = useState({ x: 0, y: 0 });

  const trackPosMain = (data) => {
    setPositionMain({ x: data.x, y: data.y });
  };

  const handleRemoveOption = (e, index) => {
    e.preventDefault();
    const newList = [...inputOptionList];
    newList.splice(index, 1);
    setInputOptionList(newList);
  };
  const [open, setOpen] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipCloseColor = () => {
    setOpenColor(false);
  };

  const handleTooltipOpen = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handleTooltipOpenColor = () => {
    if (openColor === true) {
      setOpenColor(false);
    } else {
      setOpenColor(true);
    }
  };
  const [sizeList, setSizeList] = useState([]);
  const addSize = (e, val) => {
    e.preventDefault();
    for (let i = 0; i < sizeList.length; i++) {
      if (val.label === sizeList[i]) {
        alert.error(`${val.label} Already Added`);
        return;
      }
    }
    sizeList.push(val.label);

    handleTooltipClose();
  };
  const colors = ["#f35e3d", "#11e95b", "#ffd414"];
  const [colorList, setColorList] = useState([]);
  const addColor = (e, color) => {
    e.preventDefault();
    for (let i = 0; i < colorList.length; i++) {
      if (color === colorList[i]) {
        alert.error(`${color} Already Added`);
        return;
      }
    }
    colorList.push(color);

    handleTooltipCloseColor();
  };
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);
  const [top, setTop] = useState(80);
  const [left, setLeft] = useState(100);
  const [rotateAngle, setRotateAngle] = useState(25);

  const [heightLogo, setHeightLogo] = useState(50);
  const [widthLogo, setWidthLogo] = useState(70);
  const [topLogo, setTopLogo] = useState(10);
  const [leftLogo, setLeftLogo] = useState(20);
  const [rotateAngleLogo, setRotateAngleLogo] = useState(0);

  const handleResize = (style, isShiftKey, type) => {
    if (TrueVar === true) {
      let { top, left, width, height } = style;
      top = Math.round(top);
      left = Math.round(left);
      width = Math.round(width);
      height = Math.round(height);
      setHeight(height);
      setWidth(width);
      setTop(top);
      setLeft(left);
    }
  };
  const handleRotate = (rotateAngle) => {
    if (TrueVar === true) {
      setRotateAngle(rotateAngle);
    }
  };
  const handleDrag = (deltaX, deltaY) => {
    if (TrueVar === true) {
      setLeft(left + deltaX);
      setTop(top + deltaY);
    }
  };

  const handleResizeLogo = (style, isShiftKey, type) => {
    if (TrueVarLogo === true) {
      let { top, left, width, height } = style;
      top = Math.round(top);
      left = Math.round(left);
      width = Math.round(width);
      height = Math.round(height);
      setHeightLogo(height);
      setWidthLogo(width);
      setTopLogo(top);
      setLeftLogo(left);
    }
  };
  const handleRotateLogo = (rotateAngleLogo) => {
    if (TrueVarLogo === true) {
      setRotateAngleLogo(rotateAngleLogo);
    }
  };
  const handleDragLogo = (deltaX, deltaY) => {
    if (TrueVarLogo === true) {
      setLeftLogo(leftLogo + deltaX);
      setTopLogo(topLogo + deltaY);
    }
  };
  const [TrueVar, setTrueVar] = useState(false);
  const [TrueVarLogo, setTrueVarLogo] = useState(false);

  if (TrueVar === false) {
    $(".main > div > .single-resizer").css({ boxShadow: "none" });
    $(".main > div > .single-resizer > .rotate").hide();
    $(".main > div > .single-resizer > .square").hide();
    $(".main > div > .single-resizer > .resizable-handler").hide();
  } else {
    $(".main > div > .single-resizer").css({
      boxShadow: "black 0px 0px 0px 1px",
    });
    $(".main > div > .single-resizer > .rotate").show();
    $(".main > div > .single-resizer > .square").show();
    $(".main > div > .single-resizer > .resizable-handler").show();
  }
  if (TrueVarLogo === false) {
    $(".logo > div > .single-resizer").css({ boxShadow: "none" });
    $(".logo > div > .single-resizer > .rotate").hide();
    $(".logo > div > .single-resizer > .square").hide();
    $(".logo > div > .single-resizer > .resizable-handler").hide();
  } else {
    $(".logo > div > .single-resizer").css({
      boxShadow: "black 0px 0px 0px 1px",
    });
    $(".logo > div > .single-resizer > .rotate").show();
    $(".logo > div > .single-resizer > .square").show();
    $(".logo > div > .single-resizer > .resizable-handler").show();
  }
  const handleClick = (e) => {
    if (e.detail === 2) {
      setTrueVar(true);
    }
  };
  const handleClickLogo = (e) => {
    if (e.detail === 2) {
      setTrueVarLogo(true);
    }
  };
  $(".resize-input").on("input", function () {
    this.style.width = this.value.length + 1.2 + "ch";
  });
  $(".resize-input-2").on("input", function () {
    this.style.width = this.value.length + 0.5 + "ch";
  });

  $("#eb").on("click", function () {
    $(".productContainerAdmin").addClass("change");
  });
  $("#fed").on("click", function () {
    $(".productContainerAdmin").removeClass("change");
  });
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="card">
        <h1 id="productListHeading">Add New Product</h1>
        <div
          className="imagesLibaray"
          style={{ display: logoLibaray ? "block" : "none" }}
        >
          <div className="imagesLibarayContent">
            <img
              src="/imgs/adidas_white.png"
              className="img-fluid"
              onClick={(e) => {
                setBrandLogo("/imgs/adidas_white.png");
                setLogoLibaray(false);
              }}
            />
            <img
              src="/imgs/nike_white.png"
              className="img-fluid"
              onClick={(e) => {
                setBrandLogo("/imgs/nike_white.png");
                setLogoLibaray(false);
              }}
            />
          </div>
        </div>
        <div
          className="imagesLibaray"
          style={{ display: mainLibaray ? "block" : "none" }}
        >
          <div className="imagesLibarayContent">
            <img
              src="/imgs/1.png"
              className="img-fluid"
              onClick={(e) => {
                setMainImage("/imgs/1.png");
                setMainLibaray(false);
              }}
            />
            <img
              src="/imgs/2.png"
              className="img-fluid"
              onClick={(e) => {
                setMainImage("/imgs/2.png");
                setMainLibaray(false);
              }}
            />
            <img
              src="/imgs/3.png"
              className="img-fluid"
              onClick={(e) => {
                setMainImage("/imgs/3.png");
                setMainLibaray(false);
              }}
            />
            <img
              src="/imgs/4.png"
              className="img-fluid"
              onClick={(e) => {
                setMainImage("/imgs/4.png");
                setMainLibaray(false);
              }}
            />
            <img
              src="/imgs/5.png"
              className="img-fluid"
              onClick={(e) => {
                setMainImage("/imgs/5.png");
                setMainLibaray(false);
              }}
            />
            <img
              src="/imgs/6.png"
              className="img-fluid"
              onClick={(e) => {
                setMainImage("/imgs/6.png");
                setMainLibaray(false);
              }}
            />
            <img
              src="/imgs/7.png"
              className="img-fluid"
              onClick={(e) => {
                setMainImage("/imgs/7.png");
                setMainLibaray(false);
              }}
            />
            <img
              src="/imgs/8.png"
              className="img-fluid"
              onClick={(e) => {
                setMainImage("/imgs/8.png");
                setMainLibaray(false);
              }}
            />
          </div>
        </div>
        <div className="card-body px-0 py-0">
          <form
            className="AddProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <div className="row">
              <div className="col-lg-12">
                <h3 className="text-center">ProductCard Preview</h3>
                <div className="productContainerAdmin">
                  <div className="productCard">
                    <div
                      className="productCard-head-1"
                      style={{ background: color }}
                    >
                      <Popup
                        trigger={
                          <Tooltip title="Choose Color" placement="right" arrow>
                            <i className="fas fa-palette grad-icon"></i>
                          </Tooltip>
                        }
                        position="right center"
                      >
                        <div className="bg-100 ml-5 p-2 rounded">
                          <ColorPicker
                            hideAdvancedSliders={true}
                            hidePresets={true}
                            hideColorGuide={true}
                            hideInputType={true}
                            value={color}
                            onChange={setColor}
                          />
                        </div>
                      </Popup>

                      <div className="image-upload logo">
                        <Tooltip placement="left" arrow title="Edit Logo">
                          <label
                            for="file-input2"
                            className="p-0"
                            style={{ margin: "20px" }}
                          >
                            <div className="box">
                              <img
                                src={
                                  brandLogo && brandLogo.length > 0
                                    ? brandLogo
                                    : "/imgs/logo.png"
                                }
                                draggable="false"
                                alt="Shoe"
                                className="card-logo-add"
                                onClick={brandLogoHandler}
                              />
                            </div>
                          </label>
                        </Tooltip>

                        {/* <input
                          onChange={brandLogoHandler}
                          id="file-input2"
                          type="file"
                        /> */}
                      </div>
                      <div className="image-upload main">
                        <label for="file-input1" className="m-0 p-0">
                          <Tooltip placement="right" arrow title="Edit Image">
                            <img
                              src={
                                mainImage && mainImage.length > 0
                                  ? mainImage
                                  : "/imgs/select_grey.png"
                              }
                              draggable="false"
                              alt="Shoe"
                              className="product-img-add"
                              onClick={mainImageHandler}
                            />
                          </Tooltip>
                        </label>

                        {/* <input
                          onChange={mainImageHandler}
                          id="file-input1"
                          type="file"
                        /> */}
                      </div>

                      <div className="product-detail z-high">
                        <h2 className="text-white">
                          <Tooltip placement="left" arrow title="Edit Category">
                            <input
                              className="prodCardInput category"
                              maxLength="10"
                              value={productCategory}
                              onChange={(e) =>
                                setProductCategory(e.target.value)
                              }
                            />
                          </Tooltip>
                        </h2>

                        <Tooltip
                          placement="left"
                          arrow
                          title="Edit Description"
                        >
                          <div className="box">
                            <textarea
                              className="prodCardInput shortDesc"
                              maxLength="100"
                              cols="35"
                              rows="3"
                              value={shortDescription}
                              onChange={(e) =>
                                setShortDescription(e.target.value)
                              }
                            />
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="productCard-body">
                      <div className="product-desc z-high">
                        <span className="product-title">
                          <Tooltip title="Edit Name" placement="left" arrow>
                            <input
                              className="prodCardInput name resize-input"
                              maxLength="5"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                            />
                          </Tooltip>
                          <Tooltip title="Edit Category" placement="top" arrow>
                            <input
                              className="prodCardInput category-bold resize-input"
                              maxLength="10"
                              value={productCategory}
                              onChange={(e) =>
                                setProductCategory(e.target.value)
                              }
                            />
                          </Tooltip>
                          <span className="badge">New</span>
                        </span>
                        <span className="product-caption">
                          <Tooltip
                            title="Edit Collection"
                            placement="left"
                            arrow
                          >
                            <input
                              className="prodCardInput collection"
                              maxLength="20"
                              value={productCollection}
                              onChange={(e) =>
                                setProductCollection(e.target.value)
                              }
                            />
                          </Tooltip>
                        </span>
                        <span className="product-rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star grey"></i>
                        </span>
                      </div>
                      <div
                        className="product-properties z-high"
                        style={{ display: "grid" }}
                      >
                        <span className="product-size">
                          <h4>Size</h4>
                          <ul className="ul-size">
                            {sizeList &&
                              sizeList.map((item) => (
                                <li>
                                  <a>{item}</a>
                                </li>
                              ))}
                            <ClickAwayListener onClickAway={handleTooltipClose}>
                              <Tooltip
                                componentsProps={{
                                  tooltip: {
                                    sx: {
                                      bgcolor: "#e0e0e0",
                                      color: "black",
                                      borderRadius: "100px",
                                      "& .MuiTooltip-tooltip": {
                                        margin: "10px",
                                      },
                                    },
                                  },
                                }}
                                PopperProps={{
                                  disablePortal: true,
                                  modifiers: [
                                    {
                                      name: "offset",
                                      options: {
                                        offset: [5, 0],
                                      },
                                    },
                                  ],
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={
                                  <ul className="ul-size-add">
                                    {attributes &&
                                      attributes.map((item) =>
                                        item.name === "size"
                                          ? item.options.map((val) => (
                                              <Fragment>
                                                <li>
                                                  <a
                                                    value={val.label}
                                                    onClick={(e) =>
                                                      addSize(e, val)
                                                    }
                                                  >
                                                    {val.label}
                                                  </a>
                                                </li>
                                              </Fragment>
                                            ))
                                          : ""
                                      )}
                                  </ul>
                                }
                                placement="right"
                              >
                                {sizeList && sizeList.length >= 5 ? (
                                  ""
                                ) : (
                                  <li>
                                    <div
                                      className="addBtn"
                                      onClick={handleTooltipOpen}
                                    >
                                      <Tooltip
                                        placement="top"
                                        arrow
                                        title="Add Size"
                                      >
                                        <i className="fas fa-plus"></i>
                                      </Tooltip>
                                    </div>
                                  </li>
                                )}
                              </Tooltip>
                            </ClickAwayListener>
                          </ul>
                        </span>
                        <span className="product-color">
                          <h4>Color</h4>
                          <ul className="ul-color">
                            {colorList &&
                              colorList.map((color) => (
                                <li>
                                  <a style={{ background: color }}></a>
                                </li>
                              ))}
                            <ClickAwayListener
                              onClickAway={handleTooltipCloseColor}
                            >
                              <Tooltip
                                componentsProps={{
                                  tooltip: {
                                    sx: {
                                      bgcolor: "#e0e0e0",
                                      color: "black",
                                      borderRadius: "100px",
                                      "& .MuiTooltip-tooltip": {
                                        margin: "10px",
                                      },
                                    },
                                  },
                                }}
                                PopperProps={{
                                  disablePortal: true,
                                  modifiers: [
                                    {
                                      name: "offset",
                                      options: {
                                        offset: [-10, 0],
                                      },
                                    },
                                  ],
                                }}
                                onClose={handleTooltipCloseColor}
                                open={openColor}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={
                                  <ul className="ul-color-add">
                                    {colors.map((color) => (
                                      <li>
                                        <a
                                          value={color}
                                          onClick={(e) => addColor(e, color)}
                                          style={{ background: color }}
                                        ></a>
                                      </li>
                                    ))}
                                  </ul>
                                }
                                placement="right"
                              >
                                {sizeList && sizeList.length >= 5 ? (
                                  ""
                                ) : (
                                  <li>
                                    <div
                                      className="addBtn"
                                      onClick={handleTooltipOpenColor}
                                    >
                                      <Tooltip
                                        placement="top"
                                        arrow
                                        title="Add Color"
                                      >
                                        <i className="fas fa-plus"></i>
                                      </Tooltip>
                                    </div>
                                  </li>
                                )}
                              </Tooltip>
                            </ClickAwayListener>
                          </ul>
                        </span>
                        <span className="product-price-add">
                          <Tooltip placement="left" arrow title="Edit Currency">
                            <input
                              className="prodCardInput currency resize-input-2"
                              maxLength="4"
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                            />
                          </Tooltip>
                          <Tooltip placement="right" arrow title="Edit Price">
                            <input
                              type="number"
                              className="prodCardInput price resize-input-2"
                              maxlength="3"
                              min="1"
                              max="999"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </Tooltip>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    Product Category
                  </label>
                  <input
                    type="text"
                    name="name"
                    maxLength="10"
                    placeholder="Enter Product Category"
                    className="prodFormInput"
                    required
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
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
                    placeholder="Enter Product Category"
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
                    placeholder="Enter Product Category"
                    className="prodFormInput"
                    required
                    value={productCollection}
                    onChange={(e) => setProductCollection(e.target.value)}
                  />
                </div>
              </div>
              <div className="col1 col-lg-12">
                <div>
                  <label for="name" className="prodFormLabel">
                    Product Category
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Product Category"
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
                  <label style={{ fontSize: "15px", margin: 0 }}>Images</label>
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
                  <label style={{ fontSize: "15px", margin: 0 }}>Images</label>
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
                    <label className="prodFormLabel">Product Attributes</label>
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
