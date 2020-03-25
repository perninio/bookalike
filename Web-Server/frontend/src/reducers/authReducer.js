import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: true,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload == {} ? false : true
      };

    default:
      return state;
  }
}
