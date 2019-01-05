import axios from "axios";
import { put } from "redux-saga/effects";
import * as actions from "../actions";

export function* getUsersSaga(action: any) {
  let role = action.role ? `?role=${action.role}` : "";
  let query = action.query ? `?query=${action.query}` : "";
  let URL = `/api/users${role}${query}`;

  // console.log(URL);
  const response = yield axios.get(URL).then(res => res.data);
  if (query) {
    yield put(actions.searchUsersSuccess(response));
  } else {
    yield put(actions.getUsersSuccess(response));
  }
}
