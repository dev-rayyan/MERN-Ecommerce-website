import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <div className="productListContainer">
          <div className="card">
            <h1 id="productListHeading">All Products</h1>
            <div class="card-body px-0 py-0">
              <div class="table-responsive scrollbar">
                <table class="table table-sm fs--1 mb-0 overflow-hidden">
                  <thead class="bg-200 text-900">
                    <tr>
                      <th class="white-space-nowrap">
                        <div class="form-check mb-0 d-flex align-items-center">
                          <input
                            class="form-check-input"
                            id="checkbox-bulk-purchases-select"
                            type="checkbox"
                            data-bulk-select='{"body":"table-purchase-body","actions":"table-purchases-actions","replacedElement":"table-purchases-replace-element"}'
                          />
                        </div>
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap"
                        data-sort="sku"
                      >
                        SKU
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap"
                        data-sort="image"
                      >
                        Image
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap "
                        data-sort="name"
                      >
                        Name
                      </th>

                      <th
                        class="sort pe-1 align-middle white-space-nowrap "
                        data-sort="stock"
                      >
                        Stock
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap text-end"
                        data-sort="price"
                      >
                        Price
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap text-end"
                        data-sort="visibleOnSite"
                      >
                        Visible On Site
                      </th>
                      <th
                        class="sort pe-1 align-middle white-space-nowrap text-end"
                        data-sort="createdAt"
                      >
                        Created At
                      </th>
                      <th class="no-sort pe-1 align-middle data-table-row-action"></th>
                    </tr>
                  </thead>
                  <tbody class="list" id="table-purchase-body">
                    {products &&
                      products.map((item) => (
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle">
                            <div class="form-check mb-0">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="recent-purchase-0"
                                data-bulk-select-row="data-bulk-select-row"
                              />
                            </div>
                          </td>
                          <td class="align-middle white-space-nowrap sku">
                            {item.SKU}
                          </td>
                          <td class="align-middle white-space-nowrap image">
                            <img src={item.images[0].url} alt={item.name} />
                          </td>
                          <td class="align-middle white-space-nowrap name">
                            {item.name}
                          </td>

                          <td class="align-middle white-space-nowrap stock">
                            {item.Stock}
                          </td>
                          <td class="align-middle text-end amount">
                            Rs {item.price}
                          </td>
                          <td class="align-middle text-end visibleOnSite">
                            {item.visibleOnSite === true ? (
                              <span class="badge rounded-pill badge-soft-success">
                                True
                              </span>
                            ) : (
                              <span class="badge rounded-pill badge-soft-danger">
                                False
                              </span>
                            )}
                          </td>
                          <td class="align-middle text-end createdAt">
                            {String(item.createdAt).substr(0, 10)}
                          </td>
                          <td class="align-middle white-space-nowrap text-end">
                            <div class="dropstart font-sans-serif position-static d-inline-block">
                              <button
                                class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end"
                                type="button"
                                id="dropdown0"
                                data-bs-toggle="dropdown"
                                data-boundary="window"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-bs-reference="parent"
                              >
                                <svg
                                  class="svg-inline--fa fa-ellipsis-h fa-w-16 fs--1"
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="ellipsis-h"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  data-fa-i2svg=""
                                >
                                  <path
                                    fill="currentColor"
                                    d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                                  ></path>
                                </svg>
                              </button>
                              <div
                                class="dropdown-menu dropdown-menu-end border py-2"
                                aria-labelledby="dropdown0"
                              >
                                <Link
                                  class="dropdown-item"
                                  target="_blank"
                                  to={`/product/${item._id}`}
                                >
                                  View
                                </Link>
                                <Link
                                  class="dropdown-item"
                                  to={`/admin/product/${item._id}`}
                                >
                                  Edit
                                </Link>
                                <div class="dropdown-divider"></div>
                                <Link
                                  onClick={() => deleteProductHandler(item._id)}
                                  class="dropdown-item text-danger"
                                >
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
