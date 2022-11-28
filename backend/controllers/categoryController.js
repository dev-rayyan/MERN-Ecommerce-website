const Category = require("../models/categoryModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/ApiFeatures");

//Get ALL Categories
exports.getAllCategories = catchAsyncErrors(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    success: true,
    categories,
  });
});

// Get Category Details
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// Create Category -- Admin
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const category = await Category.create(req.body);

  res.status(200).json({
    success: true,
    category,
  });
});

// Update Category -- Admin
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete Category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Category Deleted Successfully",
  });
});
