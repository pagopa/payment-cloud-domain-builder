
export const filterEmptyFields = <T extends Record<string, any>>(data: T): Partial<T> => {
  const filtered: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (
      value !== "" &&
      value !== false &&
      value !== null &&
      value !== undefined &&
      !(typeof value === "object" && Object.keys(value).length === 0)
    ) {
      filtered[key] = value;
    }
  });

  return filtered as Partial<T>;
};