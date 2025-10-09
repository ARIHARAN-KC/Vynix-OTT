/**
 * generates a url query from an object
 * @param obj
 */
export const generateQuery = (obj) => {
  return (
    "?" +
    Object.entries(obj)
      .map(([key, value]) => {
        if (value) {
          return `${key}=${value}`;
        }
        return undefined;
      })
      .filter((value) => value !== undefined)
      .join("&")
  );
};
