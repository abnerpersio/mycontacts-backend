const whitelist = ['http://localhost:3000'];

module.exports = (req, res, next) => {
  const isOriginWhiteListed = whitelist.find((item) => item === req.headers.origin);

  if (isOriginWhiteListed) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '40');
  }

  next();
};
