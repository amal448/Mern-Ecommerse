 const errorHandler = (statusCode, message) => {
    console.log("statusCode",statusCode)
    const error = new Error();

    error.statusCode = statusCode;
    error.message = message;
    return error;
  };
  module.exports =errorHandler


