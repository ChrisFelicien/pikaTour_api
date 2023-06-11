import { CustomErrorMessage } from "./CustomErrorMessage.js";

const defaultError = (err, req, res, next) => {
  if (err instanceof CustomErrorMessage) {
    return res.status(err.statusCode).json({
      status: "Fail",
      message: err.message,
    });
  }
  res.status(500).json({
    status: "error",
    message: "Something went wrong please try again",
  });
};

export default defaultError;
