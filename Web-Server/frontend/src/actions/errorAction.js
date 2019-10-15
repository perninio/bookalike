import { SET_ERRORS } from "../actions/types";

export const setErrors = errorData => {
  return {
    type: SET_ERRORS,
    payload: [...errorData]
  };
};
