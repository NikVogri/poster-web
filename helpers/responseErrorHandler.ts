import { AxiosError } from "axios";
import createToast from "./toast";

/**
 * Global API response handler
 * @param error
 */
export const responseErrorHandler = (error: AxiosError): void => {
  let errorMessage = "Something went wrong, please try again later.";

  if (typeof error.response.data?.error === "string") {
    errorMessage = error.response.data.error;
  }

  createToast("An error occured!", errorMessage, "error");
};
