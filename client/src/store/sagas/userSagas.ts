import axios from "axios";
import { delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { IUser } from "../../typeDefs";
import * as actions from "../actions";

////////// LOGIN
interface ILoginAction {
  type: string;
  email: string;
  password: string;
}

export function* loginUserSaga(action: ILoginAction) {
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

////////// AUTH

export function* authUserSaga() {
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

////////// LOGOUT
interface ILogoutAction {
  type: string;
  timeout: number;
}

export function* logoutUserSaga(action: ILogoutAction) {
  yield delay(action.timeout);
  yield axios.get(`/api/logout`);
  yield put(actions.logoutUserSuccess());
  yield localStorage.removeItem("state");
}

////////// UPDATE
interface IUpdateAction {
  type: string;
  origin: string;
  values: IUser;
}

export function* userUpdateSaga(action: IUpdateAction) {
  action.values.origin = action.origin;

  const response = yield axios
    .post(`/api/update_user`, action.values)
    .then(res => res.data);
  yield put(actions.userUpdateSuccess(response));
}

////////// SIGNUP
export type UserSignupVals = {
  email: string;
  password: string;
  photos: string[];
  profilename: string;
  profilenameColor: string;
  role: string;
};

interface ISignupAction {
  type: string;
  values: UserSignupVals;
}

export function* userSignupSaga(action: ISignupAction) {
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

////////// SIGNUP
type ProfileDataAction = {
  type: string;
  id: string;
};

export function* profileDataSaga(action: ProfileDataAction) {
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
