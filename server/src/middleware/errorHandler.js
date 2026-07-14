export const errorHandler = (err, _req, res, _next) => {
  console.error('[server-error]', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
};
