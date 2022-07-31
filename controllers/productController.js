const Product = require("../models/productModel");

const getAllProductsStatic = async (req, res) => {
  // const search = "a";
  const products = await Product.find({});
  // name: { $regex: search, $options: "i" },

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, name, company, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "lte",
    };

    const reqEx = /\b(>|>=|=|<|<=)\b/g; // b(> | >= | = | < | <=) spaces removed

    // let filters = numericFilters.replace(
    //   reqEx,
    //   (match) => `-${operatorMap[match]}-`
    //   );
    //   console.log(filters)

    // const options = ["price", "rating"];

    // filters = filters.split(",").forEach((item) => {
    //   const [field, operator, value] = item.split("-");

    //   if (options.includes(field)) {
    //     queryObj[field] = { [operator]: Number(value) };
    //   }
    // });
    let filters = numericFilters.replace(
      reqEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObj);

  let result = Product.find(queryObj);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // fields
  if (fields) {
    let fieldList = fields.split(",").join(" ");
    result.select(fieldList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
