import axios from "axios";
import { delay } from "redux-saga";
import { put, call } from "redux-saga/effects";

import * as actions from "../actions";

export function* loginUserSaga(action: any) {
  const { email, password } = action;
  try {
    const response = yield axios
      .post("/api/login", { email, password })
      .then(res => res.data);

    if (response.isAuth) {
      yield put(actions.loginUserSuccess(response));
    } else {
      yield put(actions.loginUserFail(response.message));
    }
  } catch (err) {
    console.log(err);
    yield put(
      actions.loginUserFail(
        `Status code ${err.response.status}: ${err.response.statusText}`
      )
    );
  }
}

export function* authUserSaga(action: any) {
  try {
    const response = yield axios.get("/api/auth").then(res => res.data);
    if (response.isAuth) {
      yield put(actions.authSuccess(response.userData));
    } else {
      yield put(actions.authFail());
    }
  } catch (err) {
    yield put(actions.authFail());
  }
}

export function* logoutUserSaga(action: any) {
  yield delay(action.timeout);
  yield call(() => localStorage.removeItem("state"));
  yield axios.get(`/api/logout`);
  yield put(actions.logoutUserSuccess());
}

export function* userUpdateSaga(action: any) {
  action.values.origin = action.origin;
  const response = yield axios
    .post(`/api/update_user`, action.values)
    .then(res => res.data);
  yield put(actions.userUpdateSuccess(response));
}

export function* userSignupSaga(action: any) {
  const response = yield axios
    .post("/api/signup", action.values)
    .then(res => res.data);

  if (!response.isAuth) {
    let errorMsg;
    if (response.msg) {
      errorMsg = response.msg.includes("email")
        ? "Email already registered."
        : "Profile name already registered. Please try another. :)";
      yield put(actions.userSignupFail(errorMsg));
    }
  } else {
    yield put(actions.userSignupSuccess(response));
  }
}

export function* profileDataSaga(action: any) {
  let id = action.id;
  if (id) {
    try {
      const response = yield axios
        .get(`/api/users?id=${id}`)
        .then(res => res.data);

      let currentProfileId = response._id;
      delete response._id;
      response.currentProfileId = currentProfileId;
      yield put(actions.profileDataSuccess(response));
    } catch (err) {
      console.log(err);
      yield put(
        actions.profileDataFail(
          `Status code ${err.response.status}: ${err.response.statusText}`
        )
      );
    }
  }
}
