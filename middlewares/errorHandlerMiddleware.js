const notFound = (_, res) => res.status(404).send("Route Doesn't exist");

const errorHandler = (err, req, res, next) => {
  return res
    .status(500)
    .json({ msg: "Something went wront, Please try again" });
};

module.exports = {
  notFound,
  errorHandler,
};
