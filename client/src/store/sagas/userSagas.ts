import axios from "axios";
import { delay } from "redux-saga";
import { put } from "redux-saga/effects";
import { IUser, IObj } from "../../typeDefs";
import * as actions from "../actions";

////////// LOGIN
type LoginAction = {
  type: string;
  email: string;
  password: string;
};

export function* loginUserSaga(action: LoginAction) {
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
type LogoutAction = {
  type: string;
  timeout: number;
};

export function* logoutUserSaga(action: LogoutAction) {
  yield delay(action.timeout);
  yield axios.get(`/api/logout`);
  yield put(actions.logoutUserSuccess());
  yield localStorage.removeItem("state");
}

////////// UPDATE
type UpdateAction = {
  type: string;
  origin: string;
  values: IUser;
};

export function* userUpdateSaga(action: UpdateAction) {
  action.values.origin = action.origin;

  const response = yield axios
    .post(`/api/update_user`, action.values)
    .then(res => res.data);
  yield put(actions.userUpdateSuccess(response));
}

type ProfileUpdateAction = {
  type: string;
  formData: IObj;
};

export function* profileUpdateSaga(action: ProfileUpdateAction) {
  const response = yield axios
    .post(`/api/update_profile`, action.formData)
    .then(res => res.data)
    .catch(error => {
      console.log(error);
    });

  yield put(actions.updateProfileSuccess(response));
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

type SignupAction = {
  type: string;
  values: UserSignupVals;
};

export function* userSignupSaga(action: SignupAction) {
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
