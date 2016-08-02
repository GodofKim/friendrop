import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_ARRAY,
  FETCH_DROPS
} from './type';

const ROOT_URL = 'http://localhost:3000';

export function loginUser({ email, password}) {
  //redux thunk -> dispatch를 더 잘이용하게 해준다?? 원래는 액크가 객체를 리턴해야되는데 함수를 리턴하게 해줌.
  return function(dispatch){
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password})
      .then(response =>{
        // Case 1: If request is good...
        // - Update state to indicate user is authenticated
        dispatch({type: AUTH_USER});
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);//localStorage는 window객체에 있으므로 임포트 안 해도 됨.

        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() =>{
        // Case 2: If request is bad... 아이디/패스워드를 틀리거나 할때.
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
    // {email : email, password: password} shotcut.
  }
}

export function signupUser({ email, password}){
  return function(dispatch){
    //axios 최신 버전부터 바뀜.
    axios({
      url: `${ROOT_URL}/signup`,
      data: {email, password},
      method: 'post',
      responseType: 'json'
    })
    .then(response => {
      dispatch({type:AUTH_USER});
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    .catch(error => {
      dispatch(authError(error.response.data.error));
    });
  };
}

//리듀서에게 에러를 보내기 위한 액션 크리에이터.
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function logoutUser(){
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {
  return function (dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      });
    })
    .catch(error => {
      console.log(error.response);
    });
  }
}

export function fetchDrops() {
  return function (dispatch){
    axios.get(`${ROOT_URL}/drops`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log (response);
      dispatch({
        type: FETCH_DROPS,
        payload: response.data.drops
      });
    })
    .catch(error => {
      console.log(error.response);
    });
  }
}

/*
export function fetchDrops() {
  const request = axios.get(`${ROOT_URL}/drops`, {
    headers: { authorization: localStorage.getItem('token')}
  });

  console.log(request);

  return {
    type: FETCH_DROPS,
    payload: request
  };
} 이건 왠지 안 되네. 역시 promise를 리턴하기 때문에 뭔가를 더 해줘야하나.
*/

/*
export function fetchArray() {
  const request = axios.get(`${ROOT_URL}/array`, {
    headers: { authorization: localStorage.getItem('token')}
  });

  console.log(request);

  return {
    type: FETCH_ARRAY,
    payload: request
  };
}
*/


//  강사는 위의  redux-thunk 보단 아래 방식을 더 선호함
// 이렇게 쓰려면 redux-promise를 써야한다?? 만약 그거 쓰고 싶으면 src/index.js 에 미들웨어 쓴다고 넣으시길.
/*
export function fetchMessage(){
  const request = axios.get(ROOT_URL, {
    headers: { authorization: localStorage.getItem('token')}
  });

  return {
    type: FETCH_MESSAGE,
    payload: request
  };
}
*/
