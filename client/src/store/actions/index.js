import * as actionTypes from './actionTypes';

export const loginUser = ({email,password}) => {
  return {
    type: actionTypes.LOGIN_USER_INIT,
    email,
    password
  }
}

export const loginUserSuccess = userData =>{
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    userData
  }
}

export const loginUserFail = errorMsg => {
  return {
    type: actionTypes.LOGIN_USER_FAIL,
    errorMsg
  }
}

export const auth = () => {
  return {
    type: actionTypes.USER_AUTH_INIT
  }
}

export const authSuccess = userData => {
  return {
    type: actionTypes.USER_AUTH_SUCCESS,
    userData
  }
}

export const authFail = () => {
  return {
    type: actionTypes.USER_AUTH_FAIL
  }
}

export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER_INIT
  }
}

export const logoutUserSuccess = () => {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS
  }
}

export const getProfileData = id => {
  return {
    type: actionTypes.GET_PROFILE_DATA
  }
}

