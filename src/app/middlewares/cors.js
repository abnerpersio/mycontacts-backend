const allowedOrigins = ['http://localhost:3000'];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const isAllowed = allowedOrigins.find((item) => item === origin);

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '40');
  }

  next();
};
