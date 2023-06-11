class CustomErrorMessage extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createErrorMessage = (message, statusCode) => {
  return new CustomErrorMessage(message, statusCode);
};

export { CustomErrorMessage, createErrorMessage };
