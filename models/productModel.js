const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
