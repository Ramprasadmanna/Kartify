const errorHandler = (err, req, res, next) => {


  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;


  if (err.name == 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Resource Not Found';
  }

  res.status(statusCode).json({
    message,
  })
}


export { errorHandler };