const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    texPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    texPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Logged in user Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get Orders by Daily/Weekly/Monthly -- Admin
exports.getOrdersByDWM = catchAsyncErrors(async (req, res, next) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let first = today.getDate() - today.getDay();
  let last = first + 6;
  let firstday = 0;
  if (first < 0) {
    firstday = new Date(
      today.getFullYear(),
      today.getMonth(),
      first
    ).toUTCString();
  } else {
    firstday = new Date(today.setDate(first)).toUTCString();
  }
  let lastday = new Date(today.setDate(last)).toUTCString();
  let firstDayMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  let lastDayMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  lastDayMonth.setHours(23, 59, 59, 0);
  today = new Date().setHours(0, 0, 0, 0);

  const todayOrders = await Order.find({
    createdAt: {
      $gte: today,
    },
  });
  const weekOrders = await Order.find({
    createdAt: {
      $gte: firstday,
      $lte: lastday,
    },
  });
  const monthOrders = await Order.find({
    createdAt: {
      $gte: firstDayMonth,
      $lte: lastDayMonth,
    },
  });

  res.status(200).json({
    success: true,
    todayOrders,
    weekOrders,
    monthOrders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this prder", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete Orders -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
