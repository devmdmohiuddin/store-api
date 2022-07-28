require("dotenv").config();
const products = require("./config/data/products.json");
const Product = require("./models/productModel");
const connectDB = require("./config/db");

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit(0);
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("Data Destroyed!");
    process.exit(0);
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
