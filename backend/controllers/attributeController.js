const Attribute = require("../models/attributeModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/ApiFeatures");

// Get ALL Attributes
exports.getAllAttributes = catchAsyncErrors(async (req, res) => {
  const attributes = await Attribute.find();
  res.status(200).json({
    success: true,
    attributes,
  });
});

// Create Attribute -- Admin
exports.createAttribute = catchAsyncErrors(async (req, res, next) => {
  let options = JSON.parse(req.body.options);

  const optionsList = [];

  options.forEach((opt) => {
    optionsList.push({
      name: opt.optionName,
      label: opt.optionLabel,
    });
  });

  req.body.user = req.user.id;
  req.body.options = optionsList;
  const attribute = await Attribute.create(req.body);

  res.status(200).json({
    success: true,
    attribute,
  });
});

// Update Attribute -- Admin
exports.updateAttribute = catchAsyncErrors(async (req, res, next) => {
  let attribute = await Attribute.findById(req.params.id);

  if (!attribute) {
    return next(new ErrorHandler("Attribute not found", 404));
  }

  attribute = await Attribute.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    attribute,
  });
});

// Delete Attribute
exports.deleteAttribute = catchAsyncErrors(async (req, res, next) => {
  const attribute = await Attribute.findById(req.params.id);

  if (!attribute) {
    return next(new ErrorHandler("Attribute not found", 404));
  }

  await attribute.remove();

  res.status(200).json({
    success: true,
    message: "Attribute Deleted Successfully",
  });
});
