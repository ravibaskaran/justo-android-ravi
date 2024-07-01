import ErrorMessage from ".";

export const handleApiError = async (error: any) => {
  switch (error?.status) {
    case 401:
      ErrorMessage({
        msg: error?.message,
      })
      break;
    case 201:
      ErrorMessage({
        msg: error?.message,
      })
      break;
    case 501:
      ErrorMessage({
        msg: error?.message,
      })
      break;
    case 403:
      ErrorMessage({
        msg: error?.message,
      })
      break;
    case 500:
      ErrorMessage({
        msg: error?.message,
      })
    case 400:
      ErrorMessage({
        msg: error?.message,
      })
      break;
  }
};