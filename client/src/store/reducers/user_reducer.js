import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userData: null,
  loading: false,
  errorMsg: '',
  isAuth: false
}

const user_reducer = (state= initialState, action) => {
  switch(action.type){
    case actionTypes.LOGIN_USER_INIT:
      return {
        ...initialState, 
        loading: true
        }
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.userData
      }
    case actionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.errorMsg
      }
    case actionTypes.USER_AUTH_INIT:
      return {
        ...initialState, 
        loading: true
        }
    case actionTypes.USER_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.userData
      }
    case actionTypes.USER_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        userData: null
      }
    case actionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        userData: null,
        isAuth: false
      } 
    default: 
      return state;
  }
}

export default user_reducer