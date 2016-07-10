const keyError = (type, key) => new Error(
  `Expected property '${key}' was not found in task of type '${type}'`
);

module.exports = (type, ...keys) => (request, next) => {
  if (request.type === type) {
    for (const key of keys) {
      if (!(key in request.payload)) {
        throw keyError(type, key);
      }
    }
  }
  return next(request);
};