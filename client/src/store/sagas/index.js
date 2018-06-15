import axios from 'axios';
import { delay } from 'redux-saga';
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
  yield delay(action.timeout)
  yield call(()=> localStorage.removeItem('state'));
  yield axios.get(`/api/logout`);
  yield put(actions.logoutUserSuccess());
}

function* userUpdateSaga(action){
  let {profilename, headerphoto, profilephoto} = action;
  const response = yield axios.post(`/api/update_user`,
      {
        profilename,
        headerphoto,
        profilephoto
      }).then(res => res.data);

  yield put(actions.userUpdateSuccess(response));

  //TODO: userUpdateFail
}

function* userSignupSaga(action){

  const response = yield axios.post('/api/signup', action.values)
        .then(res => res.data); 

  console.log(response);
  yield put(actions.userSignupSuccess(response));

  //TODO: signupFail
}

function* profileDataSaga(action){
  let userId = yield action.id;
  if(userId){
    try {
      const response = yield axios.get(`/api/users?id=${userId}`)
        .then(res => res.data);
      
      let currentProfileId = response._id;
      delete response._id;
      response.currentProfileId = currentProfileId;
      yield put(actions.profileDataSuccess(response));
    } catch(err){
      yield put(actions.profileDataFail());
    }
  }
}

export function* watchLogin(){
  yield takeEvery(actionTypes.LOGIN_USER_INIT, loginUserSaga);
  yield takeEvery(actionTypes.USER_AUTH_INIT, authUserSaga);
  yield takeEvery(actionTypes.LOGOUT_USER_INIT, logoutUserSaga);
  yield takeEvery(actionTypes.PROFILE_DATA_INIT , profileDataSaga);
  yield takeEvery(actionTypes.USER_UPDATE_INIT , userUpdateSaga);
  yield takeEvery(actionTypes.USER_SIGNUP_INIT , userSignupSaga);
}