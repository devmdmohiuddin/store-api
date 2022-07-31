require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const connectDB = require("./config/db");
const {
  notFound,
  errorHandler,
} = require("./middlewares/errorHandlerMiddleware");
const productRoutes = require("./routes/productRoutes");

const app = express();

// database
connectDB();

// middleware
app.use([morgan("dev"), express.json()]);

// routes
app.use("/api/products/v1", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on development mode and port ${PORT}.`);
});
