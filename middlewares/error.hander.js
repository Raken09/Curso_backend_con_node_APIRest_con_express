function logErrors (err, req, res, next) {
  console.log('logErrors')
  console.error(err);
  next(err);
};

// Detectar un error creando un formato para enviar al cliente
function errorHandler (err, req, res, next) {
  console.log('errorHandler')
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler };
