import { takeEvery, takeLatest, all } from "redux-saga/effects";
import actionTypes from "../actions/actionTypes";

import {
  loginUserSaga,
  authUserSaga,
  logoutUserSaga,
  userUpdateSaga,
  userSignupSaga,
  profileDataSaga
} from "./userSagas";

import { getUsersSaga } from "./searchSagas";

export function* watchUser() {
  yield all([
    takeEvery(actionTypes.LOGIN_USER_INIT, loginUserSaga),
    takeEvery(actionTypes.USER_AUTH_INIT, authUserSaga),
    takeEvery(actionTypes.LOGOUT_USER_INIT, logoutUserSaga),
    takeEvery(actionTypes.PROFILE_DATA_INIT, profileDataSaga),
    takeEvery(actionTypes.USER_UPDATE_INIT, userUpdateSaga),
    takeEvery(actionTypes.USER_SIGNUP_INIT, userSignupSaga)
  ]);
}

export function* watchSearch() {
  yield takeLatest(actionTypes.SEARCHBOX_KEYPRESS, getUsersSaga);
  yield takeLatest(actionTypes.GET_USERS_INIT, getUsersSaga);
}
