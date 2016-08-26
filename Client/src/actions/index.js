import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_ARRAY,
  FETCH_DROPS,
  FETCH_PROFILE,
  FETCH_LETTERS,
  FETCH_CONTACTS,
  EDIT_PROFILE,
  FETCH_PROFILE_OTHER,
} from './type';

export const ROOT_URL = 'http://localhost:3000';

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
        browserHistory.push('/todaydrop');
      })
      .catch(() =>{
        // Case 2: If request is bad... 아이디/패스워드를 틀리거나 할때.
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
    // {email : email, password: password} shortcut.
  };
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
    .then((response) => {
      dispatch({type:AUTH_USER});
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/profile-edit');
    })
    .catch((error) => {
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
  };
}

export function removeUser() {
  return function (dispatch){
    axios({
      url: `${ROOT_URL}/user`,
      method: 'delete',
      responseType: 'json',
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        logoutUser();
        browserHistory.push('/');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
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
  };
}

export function fetchProfile() {
  //나중엔 :id 까지 추가하자고
  return function (dispatch){
    axios.get(`${ROOT_URL}/profile`, {
        headers: { authorization: localStorage.getItem('token')}
      })
      .then(response => {
        console.log ("빼애액",response);
        dispatch({
          type: FETCH_PROFILE,
          payload: response.data.profile
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}

export function fetchProfileOther(email){
  return function(dispatch){
    axios.get(`${ROOT_URL}/profile/${email}`, {
      headers: { authorization : localStorage.getItem('token')}
    })
      .then(response => {
        console.log("Action_fetchProfileOther : Success", response.data.profile);
        dispatch({
          type: FETCH_PROFILE_OTHER,
          payload: response.data.profile
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
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
  };
}

export function fetchLetters() {
  return function (dispatch){
    axios.get(`${ROOT_URL}/letters`, {
        headers: { authorization: localStorage.getItem('token')}
      })
      .then(response => {
        console.log ("Action-fetchLetters ", response);
        dispatch({
          type: FETCH_LETTERS,
          payload: response.data.letters
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}

export function fetchContacts() {
  return function (dispatch){
    axios.get(`${ROOT_URL}/contacts`, {
        headers: { authorization: localStorage.getItem('token')}
      })
      .then(response => {
        console.log (response);
        dispatch({
          type: FETCH_CONTACTS,
          payload: response.data.contacts
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}

export function editProfile({ name, nickname, school, major}){
  return function(dispatch){
    //axios 최신 버전부터 바뀜.
    console.log("action work?");
    axios({
      url: `${ROOT_URL}/profile`,
      data: {name, nickname, school, major},
      method: 'post',
      responseType: 'json',
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        console.log("editProfile Action: SUCCESS");
        dispatch({type: FETCH_PROFILE});
        browserHistory.push('/profile');
      })
      .catch(error => {
        console.log("editProfile Action: FAIL");
        dispatch(authError(error.response.data.error));
      });
  };
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
