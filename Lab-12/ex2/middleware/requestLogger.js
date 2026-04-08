function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[Global-1] ${req.method} ${req.url} at ${timestamp}`);
  next();
}

module.exports = requestLogger;
