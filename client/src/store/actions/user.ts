import actionTypes from "./actionTypes";

export const clearErrorMsg = () => {
  return {
    type: actionTypes.CLEAR_ERROR_MSG
  };
};

export const loginUser = ({
  email,
  password
}: {
  email: String;
  password: String;
}) => {
  return {
    type: actionTypes.LOGIN_USER_INIT,
    email,
    password
  };
};

interface LoginUserSuccessObj {
  isAuth: boolean;
  userData: any;
}

export const loginUserSuccess = (response: LoginUserSuccessObj) => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    userData: response.userData
  };
};

export const loginUserFail = (errorMsg: String) => {
  return {
    type: actionTypes.LOGIN_USER_FAIL,
    errorMsg
  };
};

export const auth = () => {
  return {
    type: actionTypes.USER_AUTH_INIT
  };
};

export const authSuccess = (userData: any) => {
  return {
    type: actionTypes.USER_AUTH_SUCCESS,
    userData
  };
};

export const authFail = () => {
  return {
    type: actionTypes.USER_AUTH_FAIL
  };
};

export const logoutUser = (timeout: Number) => {
  return {
    type: actionTypes.LOGOUT_USER_INIT,
    timeout
  };
};

export const logoutUserSuccess = () => {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS
  };
};

interface UpdateUserVals {
  headerOverlay?: String;
  headerphoto?: String;
  origin?: String;
  profilename?: String;
  profilenameColor?: String;
  profilephoto?: String;
}

export const updateUser = (values: UpdateUserVals, origin: String) => {
  return {
    type: actionTypes.USER_UPDATE_INIT,
    values,
    origin
  };
};

export const userUpdateSuccess = (values: any) => {
  return {
    type: actionTypes.USER_UPDATE_SUCCESS,
    values
  };
};

interface UserSignupVals {
  email: String;
  password: String;
  photos: any;
  profilename: String;
  profilenameColor: String;
  role: String;
}

export const userSignup = (values: UserSignupVals) => {
  return {
    type: actionTypes.USER_SIGNUP_INIT,
    values
  };
};

export const userSignupFail = (errorMsg: String) => {
  return {
    type: actionTypes.USER_SIGNUP_FAIL,
    errorMsg
  };
};

export const userSignupSuccess = (values: any) => {
  return {
    type: actionTypes.USER_SIGNUP_SUCCESS,
    userData: values.userData
  };
};

export const profileDataInit = (id: String) => {
  return {
    type: actionTypes.PROFILE_DATA_INIT,
    id
  };
};

export const profileDataSuccess = (values: any) => {
  return {
    type: actionTypes.PROFILE_DATA_SUCCESS,
    profileData: values
  };
};

export const profileDataFail = (errorMsg: String) => {
  return {
    type: actionTypes.PROFILE_DATA_FAIL,
    errorMsg
  };
};

export const clearProfileData = (id: String) => {
  return {
    type: actionTypes.CLEAR_PROFILE_DATA,
    id
  };
};
