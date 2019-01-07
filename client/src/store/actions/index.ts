import { ActionType } from "typesafe-actions";

import {
  clearErrorMsg,
  loginUser,
  loginUserSuccess,
  loginUserFail,
  auth,
  authSuccess,
  authFail,
  logoutUser,
  logoutUserSuccess,
  updateUser,
  userUpdateSuccess,
  userSignup,
  userSignupFail,
  userSignupSuccess,
  profileDataInit,
  profileDataSuccess,
  profileDataFail,
  clearProfileData
} from "./user";

import {
  getUsers,
  getUsersSuccess,
  searchUsersSuccess,
  searchBoxTouched,
  searchBoxKeypress,
  clearSearchbox
} from "./search";

export {
  clearErrorMsg,
  loginUser,
  loginUserSuccess,
  loginUserFail,
  auth,
  authSuccess,
  authFail,
  logoutUser,
  logoutUserSuccess,
  updateUser,
  userUpdateSuccess,
  userSignup,
  userSignupFail,
  userSignupSuccess,
  profileDataInit,
  profileDataSuccess,
  profileDataFail,
  clearProfileData,
  getUsers,
  getUsersSuccess,
  searchUsersSuccess,
  searchBoxTouched,
  searchBoxKeypress,
  clearSearchbox
};

export type RootAction =
  | ActionType<typeof clearErrorMsg>
  | ActionType<typeof loginUser>
  | ActionType<typeof loginUserSuccess>
  | ActionType<typeof loginUserFail>
  | ActionType<typeof auth>
  | ActionType<typeof authSuccess>
  | ActionType<typeof authFail>
  | ActionType<typeof logoutUser>
  | ActionType<typeof logoutUserSuccess>
  | ActionType<typeof updateUser>
  | ActionType<typeof userUpdateSuccess>
  | ActionType<typeof userSignup>
  | ActionType<typeof userSignupFail>
  | ActionType<typeof userSignupSuccess>
  | ActionType<typeof profileDataInit>
  | ActionType<typeof profileDataSuccess>
  | ActionType<typeof profileDataFail>
  | ActionType<typeof clearProfileData>
  | ActionType<typeof getUsers>
  | ActionType<typeof getUsersSuccess>
  | ActionType<typeof searchUsersSuccess>
  | ActionType<typeof searchBoxTouched>
  | ActionType<typeof searchBoxKeypress>
  | ActionType<typeof clearSearchbox>;
