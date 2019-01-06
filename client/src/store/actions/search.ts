import actionTypes from "./actionTypes";

export const searchBoxTouched = () => {
  return {
    type: actionTypes.SEARCHBOX_TOUCHED
  };
};

export const searchBoxKeypress = (query: String) => {
  return {
    type: actionTypes.SEARCHBOX_KEYPRESS,
    query
  };
};

export const clearSearchbox = () => {
  return {
    type: actionTypes.SEARCHBOX_CLEAR
  };
};

export const getUsers = (role: String) => {
  return {
    type: actionTypes.GET_USERS_INIT,
    role
  };
};

export const getUsersSuccess = (response: Array<Object>) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    payload: response
  };
};

export const searchUsersSuccess = (response: Array<Object>) => {
  return {
    type: actionTypes.SEARCH_USERS_SUCCESS,
    payload: response
  };
};
