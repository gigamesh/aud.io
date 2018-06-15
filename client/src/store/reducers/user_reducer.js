import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  errorMsg: '',
  isAuth: false,
  photos: {},
  address: {},
  gearList: [],
  genres: [],
  expertise: {}
}

const user_reducer = (state= initialState, action) => {
  switch(action.type){
    case actionTypes.CLEAR_ERROR_MSG:
      return {
        ...state,
        errorMsg: ''
      }
    case actionTypes.LOGIN_USER_INIT:
      return {
        ...initialState, 
        loading: true,
        errorMsg: ''
        }
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
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
        loading: true,
        errorMsg: ''
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
    case actionTypes.LOGOUT_USER_INIT:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOGOUT_USER_SUCCESS:
      return initialState
    case actionTypes.USER_UPDATE_INIT:
      return {
        ...state,
        loading: true,
        errorMsg: ''
      }
    case actionTypes.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        profilename: action.values.profilename,
        photos: {
          primary: action.values.photos.primary,
          header: action.values.photos.header
        }
      }
    case actionTypes.USER_SIGNUP_INIT:
      return {
        ...state,
        loading: true,
        errorMsg: ''
      }
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        ...action.userData
      }
    case actionTypes.PROFILE_DATA_INIT:
      return {
        ...state,
        loading: true,
        errorMsg: ''
      }
    case actionTypes.PROFILE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.profileData
      }
    case actionTypes.PROFILE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: 'There was an error'
      }
    default: 
      return state;
  }
}

export default user_reducer