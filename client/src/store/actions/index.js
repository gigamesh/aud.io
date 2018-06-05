import axios from 'axios';

export function loginUser({email,password}){
  const request = axios.post('/api/login',{email,password})
              .then(res => res.data);

  return {
    type: 'LOGIN_USER',
    payload: request
  }
}