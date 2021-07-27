function errorHandler(err, req, res, next) {
  console.error(err);
  const { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
