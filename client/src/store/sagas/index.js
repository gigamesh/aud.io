import axios from 'axios';
// import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';

import * as actions from '../actions';
import * as actionTypes from '../actions/actionTypes';

function* loginUserSaga(action){
  const {email, password} = action;
  const response = yield axios.post('/api/login',{email, password})
        .then(res => res.data); 

  if(response.isAuth){
    yield put(actions.loginUserSuccess(response));
  } else {
    yield put(actions.loginUserFail(response.message));
  }
}

function* authUserSaga(action){
  try {
    const response = yield axios.get('/api/auth')
            .then(res => res.data);
    if(response.isAuth){
      yield put(actions.authSuccess(response.userData));
    } else {
      yield put(actions.authFail());
    }
  } catch(err){
    yield put(actions.authFail());    
  }
}

function* logoutUserSaga(action){
  yield call(()=> localStorage.removeItem('state'));
  yield axios.get(`/api/logout`);
  yield put(actions.logoutUserSuccess());
}

function* getProfileDataSaga(id){
  const response = yield axios.get(`/api/users?_id=${id}`)
                      .then(res => res.data);
       console.log(response)               
  if(response._id){
    // yield getProfileDataSuccess(response);
  } else {

  }
}

export function* watchLogin(){
  yield takeEvery(actionTypes.LOGIN_USER_INIT, loginUserSaga);
  yield takeEvery(actionTypes.USER_AUTH_INIT, authUserSaga);
  yield takeEvery(actionTypes.LOGOUT_USER_INIT, logoutUserSaga);
  yield takeEvery(actionTypes.GET_PROFILE_DATA , getProfileDataSaga)
}