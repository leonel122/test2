module.exports = () => {
  return function ip(req, res, next) {
    req.feathers.ip = req.ip;
    next();
  };
};
