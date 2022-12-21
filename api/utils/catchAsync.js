module.exports = func => {
    return (req, res, next) => {
      func(req, res, next).catch (err => {
        res.status(err.statusCode).json({ error: err.toString() });
      });
    }
}