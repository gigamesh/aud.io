const user_reducer = (state={}, action) => {
  switch(action.type){
    case 'LOGIN_USER':
      console.log(action.payload);
      return {...state, user: action.payload}
    default: 
      return state;
  }
}

export default user_reducer