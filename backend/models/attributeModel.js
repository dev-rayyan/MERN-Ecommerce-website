const mongoose = require("mongoose");

var mongoObjectId = function () {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Attribute Name"],
  },
  options: [
    {
      name: {
        type: String,
        required: [true, "Please Enter Attribute Name"],
      },
      label: {
        type: String,
        required: [true, "Please Enter Attribute Label"],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attribute", attributeSchema);
