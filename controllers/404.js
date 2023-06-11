const notFound = (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "This route is not defined",
  });
};

export default notFound;
