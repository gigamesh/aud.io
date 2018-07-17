import * as actionTypes from './actionTypes';

export const clearErrorMsg = () => {
  return {
    type: actionTypes.CLEAR_ERROR_MSG
  }
}

export const loginUser = ({email,password}) => {
  return {
    type: actionTypes.LOGIN_USER_INIT,
    email,
    password
  }
}

export const loginUserSuccess = response =>{
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    userData: response.userData
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

export const logoutUser = (timeout) => {
  return {
    type: actionTypes.LOGOUT_USER_INIT,
    timeout
  }
}

export const logoutUserSuccess = () => {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS
  }
}

export const updateUser = (values, origin) => {
  return {
    type: actionTypes.USER_UPDATE_INIT,
    values,
    origin
  }
}

export const userUpdateSuccess = (values) => {
  return {
    type: actionTypes.USER_UPDATE_SUCCESS,
    values
  }
}

export const userSignup = values => {
  return {
    type: actionTypes.USER_SIGNUP_INIT,
    values
  }
}

export const userSignupFail = errorMsg => {
  return {
    type: actionTypes.USER_SIGNUP_FAIL,
    errorMsg
  }
}

export const userSignupSuccess = values => {
  return {
    type: actionTypes.USER_SIGNUP_SUCCESS,
    userData: values.userData
  }
}

export const profileDataInit = (id) => {
  return {
    type: actionTypes.PROFILE_DATA_INIT,
    id
  }
}

export const profileDataSuccess = values => {
  return {
    type: actionTypes.PROFILE_DATA_SUCCESS,
    profileData: values
  }
}

export const profileDataFail = () => {
  return {
    type: actionTypes.PROFILE_DATA_FAIL
  }
}

// export const clearProfileData = (id) => {
//   return {
//     type: actionTypes.CLEAR_PROFILE_DATA,
//     id
//   }
// }