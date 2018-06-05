import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

function* loginUserSaga(action, ){

  const request = yield axios.post('/api/login',{email,password})
              .then(res => res.data);

      console.log(request);
  yield put({
    type: 'LOGIN_USER',
    payload: request
  })
}

export function* watchLogin(){
  yield takeEvery(actionTypes.INIT_LOGIN_USER, loginUserSaga);
}