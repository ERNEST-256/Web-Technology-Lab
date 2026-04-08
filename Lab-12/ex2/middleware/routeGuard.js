function routeGuard(req, res, next) {
  console.log('[Route Middleware] routeGuard running');

  if (req.query.token !== 'lab12') {
    return res.status(401).json({
      message: 'Unauthorized. Provide ?token=lab12 for access.',
      requestId: req.requestId
    });
  }

  return next();
}

module.exports = routeGuard;
