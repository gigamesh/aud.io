import axios from "axios";
import { put } from "redux-saga/effects";
import * as actions from "../actions";
import { ISearchAction } from "../../typeDefs";

export function* getUsersSaga(action: ISearchAction) {
  let role = action.role ? `?role=${action.role}` : "";
  let query = action.query ? `?query=${action.query}` : "";
  let URL = `/api/users${role}${query}`;

  const response = yield axios.get(URL).then(res => res.data);

  if (query) {
    yield put(actions.searchUsersSuccess(response));
  } else {
    yield put(actions.getUsersSuccess(response));
  }
}
