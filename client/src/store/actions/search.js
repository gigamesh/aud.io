import * as actionTypes from './actionTypes';

export const searchBoxTouched = () => {
  return {
    type: actionTypes.SEARCHBOX_TOUCHED
  }
}

export const searchBoxKeypress = query => {
  return {
    type: actionTypes.SEARCHBOX_KEYPRESS,
    query
  }
}

export const clearSearchbox = () => {
  return {
    type: actionTypes.SEARCHBOX_CLEAR
  }
}

export const getUsers = (role, query, genres, skip, limit, order) => {
  return {
    type: actionTypes.GET_USERS_INIT,
    role, 
    query, 
    genres, 
    skip, 
    limit, 
    order
  }
}

export const getUsersSuccess = (response) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    response
  }
}

export const searchUsersSuccess = (response) => {
  return {
    type: actionTypes.SEARCH_USERS_SUCCESS,
    response
  }
}