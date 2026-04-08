function requestTrace(req, res, next) {
  console.log('[Global-2] Passing through requestTrace middleware');
  req.requestId = `REQ-${Date.now()}`;
  next();
}

module.exports = requestTrace;
