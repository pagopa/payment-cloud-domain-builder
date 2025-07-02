export const filterEmptyFields = (data: FormData): Partial<FormData> => {
  const filtered: Partial<FormData> = {};
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== "" && value !== false && value !== null && value !== undefined) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        if (Object.keys(value).length > 0) {
          filtered[key as keyof FormData] = value;
        }
      } else {
        filtered[key as keyof FormData] = value;
      }
    }
  });
  
  return filtered;
};