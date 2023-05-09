export function joiValidation(obj) {
  return (req, res, next) => {
    if (!obj) {
      return next();
    }

    const entries = Object.entries(obj);
    for (let i = 0, l = entries.length; i < l; i += 1) {
      const [key, schema] = entries[i];
      const { value, error } = schema.validate(req[key]);
      req[key] = value;
      if (error) {
        return next(error);
      }
    }
    return next();
  };
}

export default joiValidation;
